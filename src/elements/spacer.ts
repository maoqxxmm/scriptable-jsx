import { ElementBuilder } from ".";

export class SpacerBuilder extends ElementBuilder {
  protected reservedProps: string[] = ["length"];

  createWidget() {
    return this.parentWidget.addSpacer(this.props.length);
  }
}
