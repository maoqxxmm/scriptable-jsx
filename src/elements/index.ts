import { JSXProps, Widget } from "../types";
import { ImageBuilder } from "./image";
import { SpacerBuilder } from "./spacer";
import { StackBuilder } from "./stack";
import { TextBuilder } from "./text";
import { simpleSetProps } from "./utils";

// 对外暴露的 Element 生成器
export class Element {
  // 由于提供的基类是抽象类，在使用 new 的时候会报错，这里使用 any 跳过检查。实际由 register 去控制输入
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

// 各个原生组件生成器的抽象类
export abstract class ElementBuilder {
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

Element.register("stack", StackBuilder);
Element.register("text", TextBuilder);
Element.register("spacer", SpacerBuilder);
Element.register("image", ImageBuilder);
