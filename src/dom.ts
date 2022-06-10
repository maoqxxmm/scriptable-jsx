import { Element } from "./elements";
import { JSXChildren, JSXNode, JSXProps, JSXType, Widget } from "./types";

export const render = (tree: JSXNode, parentWidget: Widget) => {
  const { type, props } = tree;
  const { children, ...otherProps } = props;

  if (typeof type === "string") {
    const widget = createDOM(parentWidget, type, props);
    widget && createChildren(widget, children);
  } else if (typeof type === "function") {
    const comp = type(props);
    createChildren(parentWidget, comp);
  } else {
    throw new Error("type must be a string or a function");
  }
};

const createDOM = (parentWidget: Widget, type: string, props: JSXProps) => {
  const element = new Element(parentWidget, props);
  return element.create(type);
};

const createChildren = (widget: Widget, children: JSXChildren) => {
  if (Array.isArray(children)) {
    children.forEach((child) => render(child, widget));
  } else if (typeof children === "object") {
    render(children, widget);
  }
};
