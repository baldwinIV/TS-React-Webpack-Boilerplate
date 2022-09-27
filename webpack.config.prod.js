const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  resolve: {
    alias: {
      "@public": path.resolve(__dirname, "./public"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@src": path.resolve(__dirname, "./src"),
    },
    extensions: [".js", ".jsx", '.ts', '.tsx', 'scss'],
  },

  entry: {
    app: path.join(__dirname, './index.tsx'),
  },

  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: [/node_modules/, /server/],
        use: ['babel-loader', 'ts-loader'],
      },

      {
        test: /\.scss$/i,
        exclude: /\.module\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },

      {
        test: /\.module\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource'
      },
    ],
  },


  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({ filename: 'bundled.css' })
  ],

};