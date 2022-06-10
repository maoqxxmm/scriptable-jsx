import { ElementBuilder } from ".";
import { Widget } from "../types";
import { simpleSetProps } from "./utils";

export class ImageBuilder extends ElementBuilder {
  createWidget() {
    return this.parentWidget.addImage(this.props.source);
  }
  setProps(widget: Widget) {
    const { source, children, ...otherProps } = this.props;
    simpleSetProps(widget, otherProps);
  }
}
