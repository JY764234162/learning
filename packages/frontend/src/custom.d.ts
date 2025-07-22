declare module "latex.js" {
  export declare class HtmlGenerator {
    constructor({ hyphenate: boolean }): void;
    stylesAndScripts(baseUrl?: string): Node;
    domFragment(): DocumentFragment;
    reset(): void;
  }

  export declare const parse: (content: string, options: { generator: HtmlGenerator }) => { htmlDocument(): HTMLDocument };
}

declare namespace JSX {
  interface IntrinsicElements {
    "micro-app": any;
  }
}
