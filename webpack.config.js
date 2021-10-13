const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/scripts.ts', './src/styles.scss'],
  mode: 'development',
  devServer: {
    port: 3000,
    historyApiFallback: true,
    client: {
      logging: 'none',
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].css'}
          },
          'sass-loader'
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html',
    favicon: 'favicon.png',
    inject: false,
  })],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts.js',
  },
};
