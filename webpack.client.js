const path = require("path");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var ManifestPlugin = require("webpack-manifest-plugin");
// const ReactLoadablePlugin = require("react-loadable/webpack")
//   .ReactLoadablePlugin;

module.exports = {
  target: "web",
  // entry: "./src/client/index.js",
  entry: {
    bundle: "./src/index.js",
  },
  mode: "development",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "build/public"),
  },
  optimization: {
    splitChunks: {
      // name: true,
      // chunks: "all",
      // maxInitialRequests: Infinity,
      // minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          maxSize: 300000,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.(?:css|scss)$/,
        use: [
          ExtractCssChunks.loader,
          {
            loader: "css-loader",
            // options: {
            //   context: path.resolve(__dirname, "context"),
            // },
          },
          {
            loader: "sass-loader",
            // options: {
            //   sourceMapEmbed: true,
            // },
          },
        ],
      },
    ],
  },
  plugins: [
    new ExtractCssChunks({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      // chunkFilename: "[id].css",
      // hot: true, // if you want HMR - we try to automatically inject hot reloading but if it's not working, add it to the config
      // orderWarning: true, // Disable to remove warnings about conflicting order between imports
      // reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
      // cssModules: true // if you use cssModules, this can help.
    }),
    new ManifestPlugin(),
    // new OptimizeCSSAssetsPlugin({
    //   cssProcessor: require("cssnano"),
    // }),
    // new ReactLoadablePlugin({
    //   filename: "./build/react-loadable.json",
    // }),
  ],
};
