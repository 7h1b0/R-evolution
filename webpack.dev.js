const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['./src', './src/styles.css'],
  output: {
    path: path.join(__dirname, 'build'),
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
            ["env", {
              targets: {
                chrome: 60,
                firefox: 55,
              },
            }],
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
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    historyApiFallback: true,
  },
};
