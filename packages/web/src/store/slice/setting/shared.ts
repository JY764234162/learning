export function toggleAuxiliaryColorModes(colourWeakness = false) {
  const htmlElement = document.documentElement;
  htmlElement.style.filter = colourWeakness ? "invert(80%)" : "";
}

export function toggleGrayscaleMode(grayscaleMode = false) {
  const GRAYSCALE_CLASS = "grayscale";

  if (grayscaleMode) {
    document.documentElement.classList.add(GRAYSCALE_CLASS);
  } else {
    document.documentElement.classList.remove(GRAYSCALE_CLASS);
  }
}
