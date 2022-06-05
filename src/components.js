export const Stack = {
  type: "Stack",
  creator: "addStack",
  props: {
    centerAlignContent: (widget) => {
      widget.centerAlignContent();
    },
    layoutVertically: (widget) => {
      widget.layoutVertically();
    },
  },
};

export const Text = {
  type: "Text",
  creator: "addText",
};

export const Spacer = {
  type: "Spacer",
  creator: (props, parentWidget) => {
    parentWidget.addSpacer(props.size);
  },
};

export const Image = {
  type: "Image",
  creator: (props, parentWidget) => {
    parentWidget.addImage(props.source);
  },
};
