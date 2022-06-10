import { Widget } from "../types";

// 直接把 props 写进 widget 对象
export const simpleSetProps = (widget: Widget, props: Record<string, any>) => {
  Object.keys(props).forEach((key) => {
    widget[key] = props[key];
  });
};
