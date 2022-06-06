module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "index.js",
    library: {
      type: "module",
    },
  },
  experiments: {
    outputModule: true,
  },
  resolve: {
    alias: {
      "@": "src",
    },
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
