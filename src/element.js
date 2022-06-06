export class Element {
  static creatorMap = new Map();

  static register(key, createFn) {
    Element.creatorMap.set(key, createFn);
  }

  constructor(parentWidget, props) {
    this.parentWidget = parentWidget;
    this.props = props;
  }

  create(type) {
    const creator = Element.creatorMap.get(type);
    if (creator) {
      return creator(this.parentWidget, this.props);
    } else {
      return null;
    }
  }
}

const setProps = (widget, props) => {
  Object.keys(props).forEach((key) => {
    widget[key] = props[key];
  });
};

Element.register("stack", (parentWidget, props) => {
  const widget = parentWidget.addStack();
  const { children, centerAlignContent, layoutVertically, ...otherProps } =
    props;
  if (centerAlignContent) {
    widget.centerAlignContent();
  }
  if (layoutVertically) {
    widget.layoutVertically();
  }
  setProps(widget, otherProps);
  return widget;
});

Element.register("text", (parentWidget, props) => {
  const { children, ...otherProps } = props;
  const widget = parentWidget.addText(children);
  setProps(widget, otherProps);
  return widget;
});

Element.register("spacer", (parentWidget, props) => {
  const { size } = props;
  const widget = parentWidget.addSpacer(size);
  return widget;
});

Element.register("image", (parentWidget, props) => {
  const { children, source, ...otherProps } = props;
  const widget = parentWidget.addImage(source);
  setProps(widget, otherProps);
  return widget;
});
