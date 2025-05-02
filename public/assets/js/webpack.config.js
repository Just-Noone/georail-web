const path = require("path");
const glob = require("glob");

module.exports = {
  entry: glob.sync("./public/assets/**/*.js"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public/assets/dist"),
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader", // Optional if using ES6+
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
};
