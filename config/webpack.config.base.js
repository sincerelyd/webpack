const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('./config');
let HTMLPlugins = [];
let Entries = {};
let pathsToClean = ['./dist'];

config.HTMLDirs.forEach(page => {
  const htmlPlugin = new HTMLWebpackPlugin({
    filename: `${page}.html`,
    template: path.resolve(__dirname, `../app/html/${page}.html`),
    title: 'hello' + page,
    hash: true,
    chunks: [page, 'commons', config.common],
  });
  HTMLPlugins.push(htmlPlugin);
  Entries[page] = path.resolve(__dirname, `../app/js/${page}.js`);
  Entries['common'] = path.resolve(__dirname, `../app/js/${config.common}.js`);
});

module.exports = {
  entry: Entries,
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'js/[name].bundle.[chunkhash].js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?sourceMap', 'sass-loader?sourceMap'],
        }),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      disable: false,
    }),
    ...HTMLPlugins,
  ],
};
