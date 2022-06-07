export type JSXType = string | ((props: JSXProps) => JSXNode);

export type JSXChildren = JSXNode[] | JSXNode | string;

export type JSXProps = {
  [key: string]: any;
  children: JSXChildren;
};

export interface JSXNode {
  type: JSXType;
  props: JSXProps;
}

export type Widget = any;
