# scriptable-jsx

This project helps you to write [Scriptable](https://scriptable.app/) widgets with JSX syntax. And add some useful tools by the way.

> you can check demos in [demo](https://github.com/maoqxxmm/scriptable-jsx/tree/master/demo) folder

[简体中文](https://github.com/maoqxxmm/scriptable-jsx/blob/master/README_zh-CN.md)

## Install

`npm i scriptable-jsx`

## Requirements

1. webpack (or other bundler)
2. babel
3. @babel/plugin-transform-react-jsx

## Usage

1. We can create a jsx file like this:

```jsx
import { render } from "scriptable-jsx";

const widget = new ListWidget();

render(<stack>Hello World</stack>, widget);

widget.presentMedium();
```

2. Set babel:

```json
{
  ...,
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "runtime": "automatic",
        // use scriptable-jsx to parse jsx
        "importSource": "scriptable-jsx"
      }
    ]
  ]
}
```

## Supported Tags

We have supported these native tags now:

- stack
- image
- spacer
- text
- date

Remember, just like react, all the native tags are lowercase. The custom tags should start with uppercase.

All the props are the same as native basically. For example:

```xml
<date date={new Date()} applyTimeStyle></date>
<stack
  size={new Size(100, 50)}
  backgroundColor={new Color("#ff0000")}
>
  <text>Test</text>
</stack>
```

## External Features

### FlexibleSize

```jsx
import { FlexibleSize } from "scriptable-jsx";

<stack size={new FlexibleSize(50, 50)}></stack>;
```

The native `Size` means the `pt` unit. It's accurate but not flexible. Users should adapt to different models. But, `FlexibleSize` helps you to write relative value to the widget size. The number you supply means the percent of the full size of width/height of widget.

We have registered common sizes (check in [device-data.ts](https://github.com/maoqxxmm/scriptable-jsx/blob/master/src/utils/size/device-data.ts)). You can add custom sizes too.

## TODO

- [ ] add unit tests
- [ ] remove `any` type
