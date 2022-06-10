# scriptable-jsx

本项目旨在为使用 Scripable 绘制小组件的布局时，提供更便捷的声明式语法，不需要再撰写繁杂的命令式语句。

## 语法介绍

可以参考 `demo/simple.jsx` 文件。对于前端开发者来说应该是非常熟悉的。

所有的原生组件使用小写，自定义组件首字母大写。

```jsx
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
```

目前实现了 Fragment 和 组件的组合、嵌套 功能。

原生组件目前支持 stack、text、spacer、image、date 五种。

## 如何使用

`npm install scriptable-jsx`

jsx 代码需要编译后使用，所以我们需要使用打包工具。webpack 的配置可以参考 `demo/webpack.config.js` 文件。

重点在于 `.babelrc` 的 `plugins` 字段：

```json
"plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "runtime": "automatic",
        // 注意这里要写 scriptable-jsx，demo 里那个是本地跑的
        "importSource": "scriptable-jsx"
      }
    ]
  ]
```

我们借助 `@babel/plugin-transform-react-jsx` 的 `importSource` 字段实现了自定义 jsx 解析
