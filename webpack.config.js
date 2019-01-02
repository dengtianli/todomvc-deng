const fs = require('fs')
const path = require('path')
const webpack =require('webpack')
const VueLoaderPlugin =require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  entry: app.js,
  output: {
    publicPath: "",
    filename: "[name].js",
  },
  module: {
    rules:[
      {test: /\.js$/,exclude: /node_modules/,use: ['babel-loader'] },
      {test: /.vue$/,use: ['vue-loader'] },
      {test: /.css$/,use: ['vue-style-loader','css=loader'] }
    ]
  },
  resolve: {
    alias: {
      "vue$": "vue/dist/vue.esm.js"
    }
  }
}