const path = require("path");

module.exports = {
  entry: "./public/assets/js/smooth-scroll.js",
  output: {
    filename: "smooth-scroll.bundle.js",
    path: path.resolve(__dirname, "public/assets/js"),
  },
  mode: "production",
};