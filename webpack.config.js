const path = require("path")
const glob = require("glob")
  //{src/Assets/js/*,build/static/?(js|css)/main.*.?(js|css)}
    module.exports = {
      mode: "production",
      entry: {
        "bundle.js": glob.sync("build/static/?(js|css)/main.*.?(js|css)").map(f => path.resolve(__dirname, f)),
      },
      output: {
        path: path.resolve(__dirname, "build"),
        filename: "static/js/bundle.min.js",
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
      plugins: [
      ],
    }