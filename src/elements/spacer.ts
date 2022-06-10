import { ElementBuilder } from ".";

export class SpacerBuilder extends ElementBuilder {
  createWidget() {
    return this.parentWidget.addSpacer();
  }
}
