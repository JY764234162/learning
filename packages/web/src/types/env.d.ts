interface ImportMeta {
  readonly env: Env.ImportMeta;
}

/**
 * Namespace Env
 *
 * It is used to declare the type of the import.meta object
 */
declare namespace Env {
  interface ImportMeta extends ImportMetaEnv {
    //app名称
    readonly VITE_APP_TITLE: string;
    //公共路径
    readonly VITE_BASENAME: string;
    //路由模式
    readonly VITE_ROUTE_MODE: "hash" | "history" | "memory";
  }
}
