const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['./src', './src/styles.css'],
  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ["env", { forceAllTransforms: true }],
          ],
          plugins: [
            ['transform-react-jsx', { pragma: 'h' }],
            'transform-class-properties',
          ],
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
    ],
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({ template: 'src/index.html', inlineSource: '.css$' }),
    new HtmlWebpackInlineSourcePlugin(),
    new HtmlWebpackInlineSourcePlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new CopyWebpackPlugin([{ from: 'assets' }]),
  ],
  bail: true,
  node: false,
  stats: {
    assets: true,
    cached: false,
    chunks: false,
    children: false,
    modules: false,
    hash: false,
    version: false,
    timings: false,
    warnings: true,
    errors: true,
    errorDetails: true,
  },
};