declare type ElegantConstRoute = Omit<RouteObject, "id" | "children" | "lazy" | "index"> & {
  name: string;
  path: string;
  meta?: Record<string, unknown>;
  children?: ElegantConstRoute[];
};
