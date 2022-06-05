import * as CompCreator from "./components";

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
  switch (type) {
    case "stack":
      return CompCreator.createStack(parentWidget, props);
    case "text":
      return CompCreator.createText(parentWidget, props);
    case "spacer":
      return CompCreator.createSpacer(parentWidget, props);
    case "image":
      return CompCreator.createImage(parentWidget, props);
  }
  return null;
};

const createChildren = (widget, children) => {
  if (Array.isArray(children)) {
    children.forEach((child) => render(child, widget));
  } else if (typeof children === "object") {
    render(children, widget);
  }
};
