import { render } from "../src/dom";
import { FlexibleSize } from "../src";

const widget = new ListWidget();

const Comp1 = function () {
  return (
    <stack
      size={new FlexibleSize(100, 50)}
      backgroundColor={new Color("#ff0000")}
    >
      <text>456</text>
    </stack>
  );
};

render(
  <>
    <stack size={new FlexibleSize(100, 20)}>
      <text>Hello</text>
      <spacer length={50}></spacer>
      <text>World</text>
    </stack>
    <stack size={new FlexibleSize(100, 20)}>
      <text>123</text>
    </stack>
    <stack size={new FlexibleSize(100, 10)}>
      <date date={new Date()} applyTimeStyle></date>
    </stack>
    <Comp1 />
  </>,
  widget
);

widget.presentMedium();
