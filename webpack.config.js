const path = require("path");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "build"),
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[hash].[ext]", // Output path for images
              publicPath: "/",
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      images: path.resolve(__dirname, "src/images"), // Alias for images folder
    },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: "single",
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            pure_funcs: ["console.log"],
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new Dotenv(), // Load environment variables from .env file
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
  devtool: "source-map",
};
