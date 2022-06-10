import { JSXProps, Widget } from "../types";
import { DateBuilder } from "./date";
import { ImageBuilder } from "./image";
import { SpacerBuilder } from "./spacer";
import { StackBuilder } from "./stack";
import { TextBuilder } from "./text";

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

  // 有一些属性是需要执行函数的，这里记录为 属性名：执行函数名
  protected funcPropsMap: Record<string, string> = {};
  // 有一些属性是初始化使用的，在 setProps 步骤时应过滤
  protected reservedProps: string[] = [];
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
    const filteredProps = Object.keys(otherProps).filter(
      (key) => !(this.reservedProps || []).includes(key)
    );
    filteredProps.forEach((key) => {
      const func = (this.funcPropsMap || {})[key];
      const value = otherProps[key];
      func ? widget[func](value) : (widget[key] = value);
    });
  }
}

Element.register("stack", StackBuilder);
Element.register("text", TextBuilder);
Element.register("spacer", SpacerBuilder);
Element.register("image", ImageBuilder);
Element.register("date", DateBuilder);
