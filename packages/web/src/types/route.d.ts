declare type ElegantConstRoute = Omit<RouteObject, "id" | "children" | "lazy" | "index"> & {
  children?: ElegantConstRoute[];
};
