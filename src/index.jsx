import { render } from "./dom";
import { Stack, Text } from "./components";

const widget = new ListWidget();

render(
  <>
    <Stack>
      <Text>Hello World</Text>
    </Stack>
  </>,
  widget
);

widget.presentMedium();
