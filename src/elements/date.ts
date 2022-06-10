import { ElementBuilder } from ".";

export class DateBuilder extends ElementBuilder {
  protected reservedProps: string[] = ["date"];
  protected funcPropsMap: Record<string, string> = {
    leftAlignText: "leftAlignText",
    centerAlignText: "centerAlignText",
    rightAlignText: "rightAlignText",
    applyTimeStyle: "applyTimeStyle",
    applyDateStyle: "applyDateStyle",
    applyRelativeStyle: "applyRelativeStyle",
    applyOffsetStyle: "applyOffsetStyle",
    applyTimerStyle: "applyTimerStyle",
  };

  createWidget() {
    return this.parentWidget.addDate(this.props.date);
  }
}
