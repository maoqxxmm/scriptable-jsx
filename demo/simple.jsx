import { render } from "../src/dom";

const widget = new ListWidget();

const Comp1 = function () {
  return (
    <stack size={new Size(100, 50)}>
      <text>456</text>
    </stack>
  );
};

render(
  <>
    <stack>
      <text>Hello World</text>
    </stack>
    <stack>
      <text>123</text>
    </stack>
    <Comp1 />
  </>,
  widget
);

widget.presentMedium();