export const jsx = (type, props) => {
  return {
    type,
    props,
  };
};

export const jsxs = jsx;

export const Fragment = function (props) {
  return props.children;
};
