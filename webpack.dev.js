var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var proxy = require('http-proxy-middleware')//解决跨域

const theme = require('./package.json').theme;

module.exports = {
	name: "production",
	entry: {
		index: "./src/index.js",
	},
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			template: './index.html',
			cache: true
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"development"'
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
				test: /\.js|\.jsx$/,
				exclude: /node_modules|server|dao|routes/,
				loader: "babel-loader"
			}, {
				test: /\.css$/,
				loader: "style-loader!css-loader"
			}, {
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					{ loader: 'less-loader', options: { modifyVars: theme } },
				],
				include: /node_modules/,
			}, {
				test: /\.scss$/,
				loaders: 'style-loader!css-loader!sass-loader'
			}, {
				test: /\.(png|jpe?g|eot|svg|ttf|woff2?)$/,
				loader: 'url-loader?limit=8192'
			}
		]
	}
}