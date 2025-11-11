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
interface Window {
  /** Ant-design-vue message instance */
  $message?: import("antd/es/message/interface").MessageInstance;
  /** Ant-design-vue modal instance */
  $modal?: Omit<import("antd/es/modal/confirm").ModalStaticFunctions, "warn">;
  /** Ant-design-vue notification instance */
  $notification?: import("antd/es/notification/interface").NotificationInstance;
  /** NProgress instance */
  NProgress?: import("nprogress").NProgress;
}
/** Build time of the project */
declare const BUILD_TIME: string;
