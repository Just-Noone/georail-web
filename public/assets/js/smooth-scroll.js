import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register the ScrollSmoother plugin
gsap.registerPlugin(ScrollSmoother);

document.addEventListener("DOMContentLoaded", () => {
  ScrollSmoother.create({
    wrapper: "body", // The wrapper element
    content: "body", // The content element
    smooth: 1.5,     // Adjust smoothness (lower is less smooth)
    effects: true    // Enable effects like parallax
  });
});

const path = require("path");

module.exports = {
  entry: "./public/assets/js/smooth-scroll.js", // Correct entry point
  output: {
    filename: "smooth-scroll.bundle.js", // Output file name
    path: path.resolve(__dirname, "public/assets/js"), // Output directory
  },
  mode: "production", // Set mode to production
};