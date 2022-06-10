import { ElementBuilder } from ".";

export class TextBuilder extends ElementBuilder {
  protected funcPropsMap: Record<string, string> = {
    leftAlignText: "leftAlignText",
    centerAlignText: "centerAlignText",
    rightAlignText: "rightAlignText",
  };

  createWidget() {
    return this.parentWidget.addText(this.props.children);
  }
}
