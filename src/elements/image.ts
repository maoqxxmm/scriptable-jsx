import { ElementBuilder } from ".";

export class ImageBuilder extends ElementBuilder {
  protected reservedProps: string[] = ["source"];
  protected funcPropsMap: Record<string, string> = {
    leftAlignImage: "leftAlignImage",
    centerAlignImage: "centerAlignImage",
    rightAlignImage: "rightAlignImage",
    applyFittingContentMode: "applyFittingContentMode",
    applyFillingContentMode: "applyFillingContentMode",
  };

  createWidget() {
    return this.parentWidget.addImage(this.props.source);
  }
}
