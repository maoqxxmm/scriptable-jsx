# scriptable-jsx

本项目旨在为编写 [Scriptable](https://scriptable.app/) 的小组件提供 JSX 语法。以及一些额外的工具。

## 安装

`npm i scriptable-jsx`

## 前置依赖

1. webpack (or other bundler)
2. babel
3. @babel/plugin-transform-react-jsx

## 用法

1. 我们可以创建一个这样的 jsx 文件:

```jsx
import { render } from "scriptable-jsx";

const widget = new ListWidget();

render(<stack>Hello World</stack>, widget);

widget.presentMedium();
```

2. 配置 Babel:

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

## 支持的标签

目前支持一下原生标签:

- stack
- image
- spacer
- text
- date

注意，和 React 一样，原生标签都是小写的。如果你想写自定义组件，那么首字母要大写。

所有的 props 都和原生的基本一样，举个 🌰:

```xml
<date date={new Date()} applyTimeStyle></date>
<stack
  size={new Size(100, 50)}
  backgroundColor={new Color("#ff0000")}
>
  <text>Test</text>
</stack>
```

## 扩展功能

### FlexibleSize

```jsx
import { FlexibleSize } from "scriptable-jsx";

<stack size={new FlexibleSize(50, 50)}></stack>;
```

原生的 `Size` 实现的是 `pt` 单位的距离。它很精确但不够弹性。使用者需要为不同尺寸的设备进行额外的适配工作。而 `FlexibleSize` 能帮助你创建出相对距离的值。传入的参数代表的是相对于小组件宽高尺寸的百分比。

我们已经提供了一些常见尺寸的数据（详见：[device-data.ts](https://github.com/maoqxxmm/scriptable-jsx/blob/master/src/utils/size/device-data.ts)）。如果有需要的话你也可以添加自定义的尺寸。

## TODO

- [ ] 写单测
- [ ] 移除 `any` 类型
