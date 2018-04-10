var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var proxy = require('http-proxy-middleware')//解决跨域
module.exports = {
	name: "production",
	entry: {
		index: "./src/index.dev.js",
		//添加要打包在vendors里面的库
		// vendor: ['react', 'react-dom', 'react-router', "antd"]
	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin(),
		new HtmlWebpackPlugin({
			hash: true,
			template: './index.html',
			cache: true
		})
	],
	devServer: {
		host: 'localhost',
		port: '8080',
		proxy: [
			{
				context: "*",
				target: '',
				changeOrigin: true,
				secure: false
			}
		]
	},

	// devServer: {
	// 	// http://120.78.83.217:11002/controller-mng/bond/allConnect
	// 	// env: require('./dev.env'),
	// 	port: 8080,  //设置访问的端口号
	// 	autoOpenBrowser: true,
	// 	assetsSubDirectory: 'static',
	// 	assetsPublicPath: '/',
	// 	proxyTable: {
	// 		'/': {
	// 			target: 'http://119.23.16.148:11002/controller-trade', //设置调用接口域名和端口号别忘了加http
	// 			changeOrigin: true,
	// 			pathRewrite: {
	// 				'^/': '/' //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用api代替
	// 				// 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可
	// 			}
	// 		}
	// 	}
	// },
	// plugins: [
	// 	//设置生产环境
	// 	new webpack.DefinePlugin({
	// 		'process.env': {
	// 			NODE_ENV: '"production"'
	// 		}
	// 	}),
	// 	//设置最小化文件, 去除warning
	// 	new webpack.optimize.UglifyJsPlugin({
	// 		minimize: true,
	// 		compress: {
	// 			warnings: false
	// 		}
	// 	}),
	// 	//去除重复代码
	// 	new webpack.optimize.DedupePlugin(),
	// 	//独立打包第三方文件
	// 	new webpack.optimize.CommonsChunkPlugin({
	// 		name: 'vendor',
	// 		filename: 'vendors.js'
	// 	}),
	// ],
	//配置;打包之后的文件信息
	output: {
		path: __dirname + "/dist/",
		filename: "[name].js",
		publicPath: '',
		chunkFilename: "[name].js",
	},
	//配置source-map
	devtool: "source-map",

	//配置loader
	module: {
		loaders: [
			//配置哪些文件需要通过babel来进行转换
			{
				test: /\.html$/,
				loader: 'html-loader'
			}, {
				test: /\.js$/,
				exclude: /node_modules|server|dao|routes/,
				loader: "babel-loader"
			}, {
				test: /\.css$/,
				loader: "style-loader!css-loader"
			}, {
				test: /\.less$/,
				loader: "style-loader!css-loader!less-loader"
			}, {
				test: /\.(png|jpe?g|eot|svg|ttf|woff2?)$/,
				loader: 'url-loader?limit=8192'
			}
		]
	}
}