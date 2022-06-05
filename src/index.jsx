import { render } from "./dom";
import { Stack, Text } from "./components";

const widget = new ListWidget();

const Comp1 = function () {
  return (
    <stack>
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
