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
    extensions: [".js", ".jsx"],
  },
  experiments: { topLevelAwait: true },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
};
