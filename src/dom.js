export const render = (tree, parentWidget) => {
  const { type, props } = tree;
  const { children, ...otherProps } = props;
  console.log(`rendering ${type.type}`);
  if (type.type === "Fragment") {
    if (Array.isArray(children)) {
      children.forEach((child) => render(child, parentWidget));
    } else if (typeof children === "object") {
      render(children, parentWidget);
    }
    return;
  }
  const widget = createElement(parentWidget, type.creator, props);
  if (!widget) {
    return;
  }
  Object.keys(otherProps).forEach((key) => {
    console.log("add props", widget, key, otherProps[key]);
    const handler = type.props?.[key];
    handler
      ? handler(widget, otherProps[key])
      : (widget[key] = otherProps[key]);
  });
};

const createElement = (parentWidget, creator, props) => {
  let widget;
  const { children, ...otherProps } = props;
  if (typeof creator === "function") {
    widget = creator(props, parentWidget);
  } else if (typeof children === "string") {
    widget = parentWidget[creator](children);
  } else {
    widget = parentWidget[creator]();
    if (Array.isArray(children)) {
      children.forEach((child) => render(child, widget));
    } else if (typeof children === "object") {
      render(children, widget);
    }
  }
  return widget;
};
