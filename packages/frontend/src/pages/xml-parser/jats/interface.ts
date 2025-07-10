import React, { CSSProperties } from "react";

export type Maybe<T> = T | undefined | null;

export interface Props<N = Node> {
  className?: string;
  style?: CSSProperties;
  node: N;
  depth?: number;
  tagName?: keyof JSX.IntrinsicElements | typeof React.Fragment;
  prefix?: string;
  baseUrl?: string;
  lang?: string;
}
