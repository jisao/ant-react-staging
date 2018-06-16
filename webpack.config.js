var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const theme = require('./package.json').theme;

module.exports = {
	name: "production",
	entry: {
		index: "./src/index.js",
		//添加要打包在vendors里面的库
		vendor: ['react', 'react-dom']
	},
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			template: './index.html',
			cache: true,
			minify: {
				removeComments: true,//去注释
				collapseWhitespace: true//去空格
			},//压缩
		}),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {
				warnings: false,
				drop_debugger: true,
				drop_console: true
			}
		}),

		new webpack.optimize.OccurrenceOrderPlugin(true),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		}),
		new ExtractTextPlugin({
			filename: "css/[name].css",
			disable: false,
			allChunks: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: "./js/vendor.js",
			minChunks: 3
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
		proxy: {
			'/': {
				target: 'https://xxxx.com',
				changeOrigin: true,
			},
		}
	},
	//配置;打包之后的文件信息
	output: {
		path: __dirname + "/dist/",
		filename: "js/[name].js",
		chunkFilename: "js/[name].js",
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
				use: ExtractTextPlugin.extract({ fallback: "style-loader", use: ["css-loader"] }),
			}, {
				test: /\.less$/,
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					{ loader: 'less-loader', options: { javascriptEnabled: true, modifyVars: theme } },
				]
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