import { ElementBuilder } from ".";

export class TextBuilder extends ElementBuilder {
  createWidget() {
    return this.parentWidget.addText(this.props.children);
  }
}
