const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");

const config = {
  entry: ["./src/script.js", "./src/reset.css", "./src/style.css"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[hash].js",
  },
  devServer: {
    port: 3030,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[hash].css",
      chunkFilename: "[id]-[hash].css",
    }),
    new WebpackPwaManifest({
      name: "wcn-chat-project",
      short_name: "wcn-chat-project",
      description: "WebClin Chat",
      theme_color: "#1976D2",
      background_color: "#f5f5f5",
      crossorigin: "anonymous",
      start_url: "/",
      orientation: "portrait",
      display: "standalone",
      icons: [
        {
          src: path.resolve("./src/android-chrome-192x192.png"),
          sizes: [192],
        },
        {
          src: path.resolve("./src/android-chrome-512x512.png"),
          sizes: [512],
        },
      ],
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        type: "javascript/auto",
        test: /\.(png|svg|jpg|gif|jfif)$/,
        use: ["file-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
  },
};
module.exports = (env, argv) => {
  if (argv.mode === "development") {
  }
  if (argv.mode === "production") {
  }
  return config;
};
