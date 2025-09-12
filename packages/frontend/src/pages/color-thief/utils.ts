/**
 * Color Thief - TypeScript Version
 * A TypeScript port of the Color Thief library for extracting color palettes from images.
 *
 * This file contains the complete implementation including:
 * - The MMCQ (Modified Median Cut Quantization) algorithm
 * - Core utility functions
 * - Browser-compatible ColorThief class
 */

type ColorTuple = [number, number, number];

interface ColorThiefOptions {
  colorCount?: number;
  quality?: number;
}

// Core utility functions (from core.js)
function createPixelArray(
  imgData: Uint8ClampedArray,
  pixelCount: number,
  quality: number
): ColorTuple[] {
  const pixelArray: ColorTuple[] = [];

  for (let i = 0; i < pixelCount; i = i + quality) {
    const offset = i * 4;
    const r = imgData[offset + 0];
    const g = imgData[offset + 1];
    const b = imgData[offset + 2];
    const a = imgData[offset + 3];

    // If pixel is mostly opaque and not white
    if (typeof a === 'undefined' || a >= 125) {
      if (!(r > 250 && g > 250 && b > 250)) {
        pixelArray.push([r, g, b]);
      }
    }
  }
  return pixelArray;
}

function validateOptions(options: ColorThiefOptions): Required<ColorThiefOptions> {
  let { colorCount, quality } = options;

  if (typeof colorCount === 'undefined' || !Number.isInteger(colorCount)) {
    colorCount = 10;
  } else if (colorCount === 1) {
    throw new Error(
      'colorCount should be between 2 and 20. To get one color, call getColor() instead of getPalette()'
    );
  } else {
    colorCount = Math.max(colorCount, 2);
    colorCount = Math.min(colorCount, 20);
  }

  if (typeof quality === 'undefined' || !Number.isInteger(quality) || quality < 1) {
    quality = 10;
  }

  return {
    colorCount,
    quality,
  };
}

// MMCQ (Modified Median Cut Quantization) Algorithm Implementation
// Based on the Leptonica library implementation

const MMCQ = (() => {
  // Private constants
  const sigbits = 5;
  const rshift = 8 - sigbits;
  const maxIterations = 1000;
  const fractByPopulations = 0.75;

  // Helper functions
  const pv = {
    naturalOrder: (a: number, b: number): number => (a < b ? -1 : a > b ? 1 : 0),
    sum: (array: number[]): number => array.reduce((p, d) => p + d, 0),
    max: (array: number[]): number => Math.max(...array),
  };

  function getColorIndex(r: number, g: number, b: number): number {
    return (r << (2 * sigbits)) + (g << sigbits) + b;
  }

  class PQueue<T> {
    private contents: T[] = [];
    private sorted = false;

    constructor(private comparator: (a: T, b: T) => number) {}

    push(o: T): void {
      this.contents.push(o);
      this.sorted = false;
    }

    peek(index?: number): T {
      if (!this.sorted) this.sort();
      if (index === undefined) index = this.contents.length - 1;
      return this.contents[index];
    }

    pop(): T | undefined {
      if (!this.sorted) this.sort();
      return this.contents.pop();
    }

    size(): number {
      return this.contents.length;
    }

    map<U>(f: (item: T) => U): U[] {
      return this.contents.map(f);
    }

    private sort(): void {
      this.contents.sort(this.comparator);
      this.sorted = true;
    }
  }

  // 3D color space box
  class VBox {
    private _volume?: number;
    private _count?: number;
    private _count_set = false;
    private _avg?: ColorTuple;

    constructor(
      public r1: number,
      public r2: number,
      public g1: number,
      public g2: number,
      public b1: number,
      public b2: number,
      private histo: number[]
    ) {}

    volume(force = false): number {
      if (!this._volume || force) {
        this._volume = (this.r2 - this.r1 + 1) * (this.g2 - this.g1 + 1) * (this.b2 - this.b1 + 1);
      }
      return this._volume;
    }

    count(force = false): number {
      if (!this._count_set || force) {
        let npix = 0;
        for (let i = this.r1; i <= this.r2; i++) {
          for (let j = this.g1; j <= this.g2; j++) {
            for (let k = this.b1; k <= this.b2; k++) {
              const index = getColorIndex(i, j, k);
              npix += this.histo[index] || 0;
            }
          }
        }
        this._count = npix;
        this._count_set = true;
      }
      return this._count ?? 0;
    }

    copy(): VBox {
      return new VBox(this.r1, this.r2, this.g1, this.g2, this.b1, this.b2, this.histo);
    }

    avg(force = false): ColorTuple {
      if (!this._avg || force) {
        const mult = 1 << (8 - sigbits);
        let ntot = 0;
        let rsum = 0;
        let gsum = 0;
        let bsum = 0;

        if (this.r1 === this.r2 && this.g1 === this.g2 && this.b1 === this.b2) {
          this._avg = [
            this.r1 << (8 - sigbits),
            this.g1 << (8 - sigbits),
            this.b1 << (8 - sigbits),
          ] as ColorTuple;
        } else {
          for (let i = this.r1; i <= this.r2; i++) {
            for (let j = this.g1; j <= this.g2; j++) {
              for (let k = this.b1; k <= this.b2; k++) {
                const histoindex = getColorIndex(i, j, k);
                const hval = this.histo[histoindex] || 0;
                ntot += hval;
                rsum += hval * (i + 0.5) * mult;
                gsum += hval * (j + 0.5) * mult;
                bsum += hval * (k + 0.5) * mult;
              }
            }
          }
          if (ntot) {
            this._avg = [
              Math.floor(rsum / ntot),
              Math.floor(gsum / ntot),
              Math.floor(bsum / ntot),
            ] as ColorTuple;
          } else {
            this._avg = [
              Math.floor((mult * (this.r1 + this.r2 + 1)) / 2),
              Math.floor((mult * (this.g1 + this.g2 + 1)) / 2),
              Math.floor((mult * (this.b1 + this.b2 + 1)) / 2),
            ] as ColorTuple;
          }
        }
      }
      return this._avg;
    }

    contains(pixel: ColorTuple): boolean {
      const rval = pixel[0] >> rshift;
      const gval = pixel[1] >> rshift;
      const bval = pixel[2] >> rshift;
      return (
        rval >= this.r1 &&
        rval <= this.r2 &&
        gval >= this.g1 &&
        gval <= this.g2 &&
        bval >= this.b1 &&
        bval <= this.b2
      );
    }
  }

  // Color map
  class CMap {
    private vboxes: PQueue<{ vbox: VBox; color: ColorTuple }>;

    constructor() {
      this.vboxes = new PQueue((a, b) =>
        pv.naturalOrder(a.vbox.count() * a.vbox.volume(), b.vbox.count() * b.vbox.volume())
      );
    }

    push(vbox: VBox): void {
      this.vboxes.push({
        vbox: vbox,
        color: vbox.avg(),
      });
    }

    palette(): ColorTuple[] {
      return this.vboxes.map((vb) => vb.color);
    }

    size(): number {
      return this.vboxes.size();
    }

    map(color: ColorTuple): ColorTuple {
      const vboxes = this.vboxes;
      for (let i = 0; i < vboxes.size(); i++) {
        if (vboxes.peek(i).vbox.contains(color)) {
          return vboxes.peek(i).color;
        }
      }
      return this.nearest(color);
    }

    nearest(color: ColorTuple): ColorTuple {
      const vboxes = this.vboxes;
      let d1: number = Infinity;
      let pColor: ColorTuple = [0, 0, 0];

      for (let i = 0; i < vboxes.size(); i++) {
        const vbColor = vboxes.peek(i).color;
        const d2 = Math.sqrt(
          Math.pow(color[0] - vbColor[0], 2) +
            Math.pow(color[1] - vbColor[1], 2) +
            Math.pow(color[2] - vbColor[2], 2)
        );
        if (d2 < d1) {
          d1 = d2;
          pColor = vbColor;
        }
      }
      return pColor;
    }
  }

  // Histogram functions
  function getHisto(pixels: ColorTuple[]): number[] {
    const histosize = 1 << (3 * sigbits);
    const histo = new Array(histosize).fill(0);

    pixels.forEach((pixel) => {
      const rval = pixel[0] >> rshift;
      const gval = pixel[1] >> rshift;
      const bval = pixel[2] >> rshift;
      const index = getColorIndex(rval, gval, bval);
      histo[index] = (histo[index] || 0) + 1;
    });
    return histo;
  }

  function vboxFromPixels(pixels: ColorTuple[], histo: number[]): VBox {
    let rmin = 1000000,
      rmax = 0;
    let gmin = 1000000,
      gmax = 0;
    let bmin = 1000000,
      bmax = 0;

    pixels.forEach((pixel) => {
      const rval = pixel[0] >> rshift;
      const gval = pixel[1] >> rshift;
      const bval = pixel[2] >> rshift;

      if (rval < rmin) rmin = rval;
      else if (rval > rmax) rmax = rval;
      if (gval < gmin) gmin = gval;
      else if (gval > gmax) gmax = gval;
      if (bval < bmin) bmin = bval;
      else if (bval > bmax) bmax = bval;
    });

    return new VBox(rmin, rmax, gmin, gmax, bmin, bmax, histo);
  }

  function medianCutApply(histo: number[], vbox: VBox): VBox[] | undefined {
    if (!vbox.count()) return;

    const rw = vbox.r2 - vbox.r1 + 1;
    const gw = vbox.g2 - vbox.g1 + 1;
    const bw = vbox.b2 - vbox.b1 + 1;
    const maxw = Math.max(rw, gw, bw);

    if (vbox.count() === 1) {
      return [vbox.copy()];
    }

    let total = 0;
    const partialsum: number[] = [];
    const lookaheadsum: number[] = [];

    if (maxw === rw) {
      for (let i = vbox.r1; i <= vbox.r2; i++) {
        let sum = 0;
        for (let j = vbox.g1; j <= vbox.g2; j++) {
          for (let k = vbox.b1; k <= vbox.b2; k++) {
            const index = getColorIndex(i, j, k);
            sum += histo[index] || 0;
          }
        }
        total += sum;
        partialsum[i] = total;
      }
    } else if (maxw === gw) {
      for (let i = vbox.g1; i <= vbox.g2; i++) {
        let sum = 0;
        for (let j = vbox.r1; j <= vbox.r2; j++) {
          for (let k = vbox.b1; k <= vbox.b2; k++) {
            const index = getColorIndex(j, i, k);
            sum += histo[index] || 0;
          }
        }
        total += sum;
        partialsum[i] = total;
      }
    } else {
      for (let i = vbox.b1; i <= vbox.b2; i++) {
        let sum = 0;
        for (let j = vbox.r1; j <= vbox.r2; j++) {
          for (let k = vbox.g1; k <= vbox.g2; k++) {
            const index = getColorIndex(j, k, i);
            sum += histo[index] || 0;
          }
        }
        total += sum;
        partialsum[i] = total;
      }
    }

    partialsum.forEach((d, i) => {
      lookaheadsum[i] = total - d;
    });

    function doCut(color: 'r' | 'g' | 'b'): VBox[] {
      const dim1 = (color + '1') as keyof VBox;
      const dim2 = (color + '2') as keyof VBox;

      for (let i = vbox[dim1] as number; i <= (vbox[dim2] as number); i++) {
        if ((partialsum[i] || 0) > total / 2) {
          const vbox1 = vbox.copy();
          const vbox2 = vbox.copy();
          const left = i - (vbox[dim1] as number);
          const right = (vbox[dim2] as number) - i;

          let d2: number;
          if (left <= right) {
            d2 = Math.min((vbox[dim2] as number) - 1, Math.floor(i + right / 2));
          } else {
            d2 = Math.max(vbox[dim1] as number, Math.floor(i - 1 - left / 2));
          }

          while (d2 >= 0 && !partialsum[d2]) d2++;
          const count2 = lookaheadsum[d2] || 0;
          while (d2 > 0 && !count2 && partialsum[d2 - 1]) {
            d2--;
          }

          (vbox1[dim2] as number) = d2;
          (vbox2[dim1] as number) = (vbox1[dim2] as number) + 1;
          return [vbox1, vbox2];
        }
      }
      return [];
    }

    return maxw === rw ? doCut('r') : maxw === gw ? doCut('g') : doCut('b');
  }

  function quantize(pixels: ColorTuple[], maxcolors: number): CMap | null {
    if (!Number.isInteger(maxcolors) || maxcolors < 1 || maxcolors > 256) {
      throw new Error('Invalid maximum color count. It must be an integer between 1 and 256.');
    }

    if (!pixels.length || maxcolors < 2) {
      return null;
    }

    const uniqueColors: ColorTuple[] = [];
    const seenColors = new Set<string>();

    for (const color of pixels) {
      const colorKey = color.join(',');
      if (!seenColors.has(colorKey)) {
        seenColors.add(colorKey);
        uniqueColors.push(color);
      }
    }

    if (uniqueColors.length <= maxcolors) {
      const colors = uniqueColors.map((c) => [c[0], c[1], c[2]] as ColorTuple);
      const cmap = new CMap();
      for (const color of colors) {
        const vbox = new VBox(
          color[0] >> rshift,
          color[0] >> rshift,
          color[1] >> rshift,
          color[1] >> rshift,
          color[2] >> rshift,
          color[2] >> rshift,
          []
        );
        cmap.push(vbox);
      }
      return cmap;
    }

    const histo = getHisto(pixels);
    const vbox = vboxFromPixels(pixels, histo);

    const pq = new PQueue<VBox>((a, b) => pv.naturalOrder(a.count(), b.count()));
    pq.push(vbox);

    function iter(lh: PQueue<VBox>, target: number): void {
      let ncolors = lh.size();
      let niters = 0;

      while (niters < maxIterations) {
        if (ncolors >= target) return;
        if (niters++ > maxIterations) return;

        const vbox = lh.pop();
        if (!vbox || !vbox.count()) {
          if (vbox) lh.push(vbox);
          niters++;
          continue;
        }

        const vboxes = medianCutApply(histo, vbox);
        if (!vboxes || vboxes.length === 0) continue;

        const [vbox1, vbox2] = vboxes;
        if (!vbox1) continue;

        lh.push(vbox1);
        if (vbox2) {
          lh.push(vbox2);
          ncolors++;
        }
      }
    }

    iter(pq, fractByPopulations * maxcolors);

    const pq2 = new PQueue<VBox>((a, b) =>
      pv.naturalOrder(a.count() * a.volume(), b.count() * b.volume())
    );

    while (pq.size()) {
      const item = pq.pop();
      if (item) pq2.push(item);
    }

    iter(pq2, maxcolors);

    const cmap = new CMap();
    while (pq2.size()) {
      const item = pq2.pop();
      if (item) cmap.push(item);
    }

    return cmap;
  }

  return {
    quantize,
  };
})();

const quantize = MMCQ.quantize;

// Canvas Image class for browser compatibility
class CanvasImage {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public width: number;
  public height: number;

  constructor(image: HTMLImageElement) {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d')!;
    this.width = this.canvas.width = image.naturalWidth || image.width;
    this.height = this.canvas.height = image.naturalHeight || image.height;
    this.context.drawImage(image, 0, 0, this.width, this.height);
  }

  getImageData(): ImageData {
    return this.context.getImageData(0, 0, this.width, this.height);
  }
}

// Main ColorThief class
export class ColorThief {
  /**
   * Get the dominant color from an image
   * @param sourceImage The source image element
   * @param quality Optional quality setting (1-10, default: 10)
   * @returns The dominant color as [R, G, B]
   */
  getColor(sourceImage: HTMLImageElement, quality = 10): ColorTuple {
    const palette = this.getPalette(sourceImage, 5, quality);
    return palette[0];
  }

  /**
   * Get a color palette from an image
   * @param sourceImage The source image element
   * @param colorCount Number of colors to return (2-20, default: 10)
   * @param quality Optional quality setting (1-10, default: 10)
   * @returns Array of colors as [R, G, B] tuples
   */
  getPalette(sourceImage: HTMLImageElement, colorCount = 10, quality = 10): ColorTuple[] {
    const options = validateOptions({ colorCount, quality });

    const image = new CanvasImage(sourceImage);
    const imageData = image.getImageData();
    const pixelCount = image.width * image.height;

    const pixelArray = createPixelArray(imageData.data, pixelCount, options.quality);

    const cmap = quantize(pixelArray, options.colorCount);
    return cmap ? cmap.palette() : [];
  }

  /**
   * Get color from image URL (async)
   * @param imageUrl URL of the image
   * @param callback Callback function to receive the color
   * @param quality Optional quality setting
   */
  getColorFromUrl(
    imageUrl: string,
    callback: (color: ColorTuple, imageUrl: string) => void,
    quality?: number
  ): void {
    const sourceImage = document.createElement('img');

    sourceImage.addEventListener('load', () => {
      const palette = this.getPalette(sourceImage, 5, quality);
      callback(palette[0], imageUrl);
    });
    sourceImage.crossOrigin = 'anonymous';
    sourceImage.src = imageUrl;
  }

  /**
   * Get image data from URL (async)
   * @param imageUrl URL of the image
   * @param callback Callback function to receive the image data
   */
  getImageData(imageUrl: string, callback: (imageData: string) => void): void {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', imageUrl, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
      if (this.status === 200) {
        const uInt8Array = new Uint8Array(this.response);
        const binaryString = Array.from(uInt8Array, (byte) => String.fromCharCode(byte)).join('');
        const base64 = btoa(binaryString);
        callback('data:image/png;base64,' + base64);
      }
    };
    xhr.send();
  }

  /**
   * Get color async from image URL
   * @param imageUrl URL of the image
   * @param callback Callback function to receive the color
   * @param quality Optional quality setting
   */
  getColorAsync(
    imageUrl: string,
    callback: (color: ColorTuple, image: HTMLImageElement) => void,
    quality?: number
  ): void {
    this.getImageData(imageUrl, (imageData) => {
      const sourceImage = document.createElement('img');
      sourceImage.addEventListener('load', function () {
        const palette = new ColorThief().getPalette(sourceImage, 5, quality);
        callback(palette[0], sourceImage);
      });
      sourceImage.src = imageData;
    });
  }
}

// Default export for backward compatibility
export default ColorThief;
