import { JSXProps, Widget } from "./types";

// 对外暴露的 Element 生成器
export class Element {
  static builderMap = new Map<string, any>();

  private parentWidget: Widget;
  private props: JSXProps;

  static register(key: string, builder: typeof ElementBuilder) {
    Element.builderMap.set(key, builder);
  }

  constructor(parentWidget: Widget, props: JSXProps) {
    this.parentWidget = parentWidget;
    this.props = props;
  }

  create(type: string) {
    const builder = Element.builderMap.get(type);
    if (builder) {
      const el = new builder(this.parentWidget, this.props);
      return el.create();
    } else {
      return null;
    }
  }
}

// 直接把 props 写进 widget 对象
const simpleSetProps = (widget: Widget, props: Record<string, any>) => {
  Object.keys(props).forEach((key) => {
    widget[key] = props[key];
  });
};

// 各个原生组件生成器的抽象类
abstract class ElementBuilder {
  protected parentWidget: Widget;
  protected props: JSXProps;

  abstract createWidget(): Widget;

  constructor(parentWidget: Widget, props: JSXProps) {
    this.parentWidget = parentWidget;
    this.props = props;
  }

  create() {
    const widget = this.createWidget();
    this.setProps(widget);
    return widget;
  }

  setProps(widget: Widget) {
    const { children, ...otherProps } = this.props;
    simpleSetProps(widget, otherProps);
  }
}

class StackBuilder extends ElementBuilder {
  createWidget() {
    return this.parentWidget.addStack();
  }
  setProps(widget: Widget) {
    const { children, centerAlignContent, layoutVertically, ...otherProps } =
      this.props;
    if (centerAlignContent) {
      widget.centerAlignContent();
    }
    if (layoutVertically) {
      widget.layoutVertically();
    }
    simpleSetProps(widget, otherProps);
  }
}

class TextBuilder extends ElementBuilder {
  createWidget() {
    return this.parentWidget.addText(this.props.children);
  }
}

class SpacerBuilder extends ElementBuilder {
  createWidget() {
    return this.parentWidget.addSpacer();
  }
}

class ImageBuilder extends ElementBuilder {
  createWidget() {
    return this.parentWidget.addImage(this.props.source);
  }
  setProps(widget: Widget) {
    const { source, children, ...otherProps } = this.props;
    simpleSetProps(widget, otherProps);
  }
}

Element.register("stack", StackBuilder);
Element.register("text", TextBuilder);
Element.register("spacer", SpacerBuilder);
Element.register("image", ImageBuilder);
