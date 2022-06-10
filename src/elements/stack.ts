import { ElementBuilder } from ".";
import { Widget } from "@/types";
import { simpleSetProps } from "./utils";

export class StackBuilder extends ElementBuilder {
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
