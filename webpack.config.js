var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var proxy = require('http-proxy-middleware')//解决跨域
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	name: "production",
	entry: {
		index: "./src/index.js",
		//添加要打包在vendors里面的库
		// vendor: ['react', 'react-dom', 'react-router', "antd"]
	},
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			template: './index.html',
			cache: true
		}),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {
				warnings: false,
				drop_debugger: true,  
				drop_console: true  
			}
		}),
		new ExtractTextPlugin("styles.css"),
		new webpack.optimize.OccurrenceOrderPlugin(true),
		//独立打包第三方文件
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendors.js'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
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
	//配置;打包之后的文件信息
	output: {
		path: __dirname + "/xinghuo-mng-static/",
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
				// loader: "style-loader!css-loader"
				use: ExtractTextPlugin.extract({ fallback: "style-loader", use: ["css-loader"] }),
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