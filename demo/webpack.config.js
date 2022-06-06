module.exports = {
  entry: "./demo/simple.jsx",
  output: {
    path: __dirname + "/dist",
    filename: "simple.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.((j|t)s|(j|t)sx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
};
