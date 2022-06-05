export const createStack = (parentWidget, props) => {
  const widget = parentWidget.addStack();
  const { children, centerAlignContent, layoutVertically, ...otherProps } =
    props;
  if (centerAlignContent) {
    widget.centerAlignContent();
  }
  if (layoutVertically) {
    widget.layoutVertically();
  }
  Object.keys(otherProps).forEach((key) => {
    widget[key] = otherProps[key];
  });
  return widget;
};

export const createText = (parentWidget, props) => {
  const { children, ...otherProps } = props;
  const widget = parentWidget.addText(children);
  Object.keys(otherProps).forEach((key) => {
    widget[key] = otherProps[key];
  });
  return widget;
};

export const createSpacer = (parentWidget, props) => {
  const { size } = props;
  const widget = parentWidget.addSpacer(size);
  return widget;
};

export const createImage = (parentWidget, props) => {
  const { children, source, ...otherProps } = props;
  const widget = parentWidget.addImage(source);
  Object.keys(otherProps).forEach((key) => {
    widget[key] = otherProps[key];
  });
  return widget;
};
