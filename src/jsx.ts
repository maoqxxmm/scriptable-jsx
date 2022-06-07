import { JSXProps, JSXType } from "./types";

export const jsx = (type: JSXType, props: JSXProps) => {
  return {
    type,
    props,
  };
};

export const jsxs = jsx;

export const Fragment = function (props: JSXProps) {
  return props.children;
};
