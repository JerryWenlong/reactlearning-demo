var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var Entry = require('./webpack_config/entry.config.js');

var dirVars = require('./webpack_config/base/dir_vars.config.js');
var pageArr = require('./webpack_config/base/page_entries.config.js');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var configPlugins = [
  new ExtractTextPlugin("[name].css"),
  new CleanWebpackPlugin(
    ['dist/*'],
    {
      root: path.resolve(__dirname, '../'), //根目录
      verbose:true,//开启控制台输出信息
      dry: false//启用删除文件
    }
  )
]


pageArr.forEach((page) => {
  const htmlPlugin = new HtmlWebpackPlugin({
    filename: `${page}/index.html`,
    template: path.resolve(dirVars.pagesDir, `./${page}/index.html`),
    chunks: [page, 'commons/commons'],
    hash: true, // 为静态资源生成hash值
    xhtml: true,
  });
  configPlugins.push(htmlPlugin);
});


var configModule = {
  loaders: [
    {
      test: /\.json$/,
      loader: "json"
    },
    {
      test: /\.jsx$|\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      plugins:['transform-runtime'],
      query: {
        presets: ['env', 'react', 'stage-0']
      }
    },
    {test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, loader: "url?limit=8192&name=imgs/[hash:8].[name].[ext]"},
    {test: /\.css$|\.less$/, loader: 'style-loader!css-loader!less-loader'},
    {test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, loader:"url?limit=8192&name=fonts/[hash:8].[name].[ext]"}
  ]
}

module.exports = {
  entry: Entry,
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: '[name]/[name].js',
    chunkFilename: '[name].js',
    publicPath: './../'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: configModule,
  plugins: configPlugins,
  resolve: {
    alias: {
      'jquery': path.resolve(__dirname, './node_modules/jquery/src/jquery'),
    }
  },
  devtool: "#cheap-module-eval-source-map"
}