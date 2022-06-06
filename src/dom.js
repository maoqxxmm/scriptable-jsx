import { Element } from "./element";

export const render = (tree, parentWidget) => {
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

const createDOM = (parentWidget, type, props) => {
  const element = new Element(parentWidget, props);
  return element.create(type);
};

const createChildren = (widget, children) => {
  if (Array.isArray(children)) {
    children.forEach((child) => render(child, widget));
  } else if (typeof children === "object") {
    render(children, widget);
  }
};
