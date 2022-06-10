import { ElementBuilder } from ".";
import { Widget } from "../types";

export class StackBuilder extends ElementBuilder {
  protected funcPropsMap: Record<string, string> = {
    setPadding: "setPadding",
    useDefaultPadding: "useDefaultPadding",
    topAlignContent: "topAlignContent",
    centerAlignContent: "centerAlignContent",
    bottomAlignContent: "bottomAlignContent",
    layoutHorizontally: "layoutHorizontally",
    layoutVertically: "layoutVertically",
  };

  createWidget() {
    return this.parentWidget.addStack();
  }
}
