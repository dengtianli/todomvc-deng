const fs = require('fs')
const path = require('path')
const webpack =require('webpack')
const VueLoaderPlugin =require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//构建前删除dist目录
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  //mode: 'development',//或者在package.json 中配置 webpack4中提供的mode有两个值：development和production，默认值是 production,mode是我们为减小生产环境构建体积以及节约开发环境的构建时间提供的一种优化方案，提供对应的构建参数项的默认开启或关闭，降低配置成本。执行npm run build,这个 --mode production 主要做了哪些事情呢？主要有hoisting, tree-shaking, minification, scope等等。对应的 –mode development 则主要是优化编译速度，输出一个没有压缩的文件。
  entry: './src/index.js', //webpack 默认入口
  output: {
    publicPath: "",
    filename: "bundle.js",// 单文件输出 ，如果多文件可在 entry :{} ,这里 filename: '[name].js'
    path:path.resolve(__dirname,"./dist")
  },
  plugins: [
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
      title: 'vuex todomvc example',
      filename: 'index.html', //生成的html存放路径，相对于 path
      template: './src/index.html', //html模板路径
    }),
    new MiniCssExtractPlugin({
      　　filename: "[name].css",
    　　 chunkFilename: "[id].css"
  　}),
    new VueLoaderPlugin(),//Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    //   new webpack.optimize.RuntimeChunkPlugin({
    //     name: "manifest"
    // }),
    new CleanWebpackPlugin(['dist','build'],{
      verbose:false,
      exclude:['img']//不删除img静态资源
    })
  ],
  
  devtool: 'inline-source-map',//开启控制台输出错误信息具体在哪行
  module: {
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options:{
              cacheDirectory:true//缓存
          }
        }
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'] 
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,'css-loader'] 
      },
      {
        test: /\.js$/,//js文件加载器
        use: ['babel-loader'],
        exclude: /node_modules/
    },
    // { //打包css里的图片
    //   test: /\.(png|jpg|gif|jpeg)$/,
    //   use: [
    //     {
    //       loader: 'url-loader',
    //       options: {
    //         limit: 8192,  //小于8KB,就base64编码
    //         name:'img/[name].[ext]',     //在哪里生成
    //         publicPath:'../'    //在生成的文件引用,前面加
    //       }
    //     }
    //   ]
    // }

      
    ]
  },
  resolve: {
    alias: {
      "vue$": "vue/dist/vue.esm.js"
    }
  },
  //从webpack4开始官方移除了commonschunk插件，改用了optimization属性进行更加灵活的配置
  optimization: {
    splitChunks: {
      cacheGroups: {// 这里开始设置缓存的 chunks
        vendors: {// key 为entry中定义的 入口名称
          chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是异步)
          // minSize: 0,
          // minChunks: 1,
          // enforce: true,
          // maxAsyncRequests: 1, // 最大异步请求数， 默认1
          // maxInitialRequests: 1, // 最大初始化请求书，默认1
          // reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
          name:'shared', // 要缓存的 分隔出来的 chunk 名称
          filename:'shared.js',
        }
      }

    //   cacheGroups: {
    //     default: {
    //         minChunks: 2,
    //         priority: -20,
    //         reuseExistingChunk: true,
    //     },
    //     //打包重复出现的代码
    //     vendor: {
    //         chunks: 'initial',
    //         minChunks: 2,
    //         maxInitialRequests: 5, // The default limit is too small to showcase the effect
    //         minSize: 0, // This is example is too small to create commons chunks
    //         name: 'vendor'
    //     },
    //     //打包第三方类库
    //     commons: {
    //         name: "commons",
    //         chunks: "initial",
    //         minChunks: Infinity
    //     }
    // }
    }
 
  }
 
}