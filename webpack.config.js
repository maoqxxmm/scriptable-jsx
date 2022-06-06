module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: __dirname + "/dist",
  },
  resolve: {
    alias: {
      "@": "src",
    },
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  experiments: { topLevelAwait: true },
  module: {
    rules: [
      {
        test: /\.((j|t)s|(j|t)sx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
};
