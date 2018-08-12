// var argv = require('yargs').argv
var argv = require('./command')
var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

var utils = require('./utils')
var config = require('../config')
var baseWebpackConfig = require('./webpack.base.conf')

var jetpack = require('fs-jetpack')
var _ = require('lodash')
var path = require('path')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = [path.resolve(path.join(__dirname, '..', 'build', 'dev-client'))].concat(baseWebpackConfig.entry[name])
  // baseWebpackConfig.entry[name] = ['./build/dev-client'f].concat(baseWebpackConfig.entry[name])
})

// iterate mock directory when app starts width mock
var hostMapPath = ""
if (argv.mock) {
  // var appName = argv.project
  // appName = appName === 'default' ? '_default' : appName
  // var mockFileList = _.map(_.filter(jetpack.list('./mock/json'), function (mockName) {
  //   return _.startsWith(mockName, appName + '@') &&
  //     !_.endsWith(mockName, '_post.json') &&
  //     !_.endsWith(mockName, 'error.json')
  // }), function (fileName) {
  //   var fileData = jetpack.read(path.resolve('mock', 'json', fileName), 'json') || { meta: {} }
  //   var code = /^.*@(.*)\.json$/.exec(fileName)[1]
  //   return {
  //     code: code,
  //     name: fileData.response.name || fileData.meta.name,
  //     type: fileData.response.code ? 'form' : 'report'
  //   }
  // })
} else {
  hostMapPath = require('./host-map.js')
}

var webpackDevConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  // https://webpack.js.org/configuration/devtool/#devtool
  // What is source maps ? http://blog.teamtreehouse.com/introduction-source-maps
  devtool:'#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        ENV_CONFIG: '"dev"',
        BASE_API: '"' + hostMapPath + '"'
      }
      // 'process.env.MOCK_FILES': JSON.stringify(mockFileList)
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'wechat.html',
    //   template: 'wechat.html',
    //   inject: true
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   compress: {
    //     warnings: false
    //   }
    // }),
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true
    // }),
    new FriendlyErrorsPlugin(),
  ]
})

module.exports = webpackDevConfig
