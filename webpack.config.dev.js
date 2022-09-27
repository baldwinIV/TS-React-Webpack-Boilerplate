const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devServer: {
    host: "localhost", // live-server host 및 port
    port: 3000,
  },

  devtool: 'source-map',

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
      // 모든 '.js' 출력 파일은 'source-map-loader'에서 다시 처리한 소스 맵이 있습니다.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.scss$/i,
        exclude: /\.module\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      //https://webpack.js.org/loaders/css-loader/
      {
        test: /\.module\.scss$/i,
        use: [
          'style-loader',
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