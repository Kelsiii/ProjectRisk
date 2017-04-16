const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: {
		app: ['whatwg-fetch', 'babel-polyfill', './web/app.js']
	},
	output: {
		path: path.join(__dirname, 'web'),
		filename: '[name].bundle.js'
	},
	module: {
		loaders: [{
		test: /\.js$/,
		exclude: /node_modules/,
		loaders: ['react-hot', 'babel']
		}, {
		test: /\.css$/,
		loaders: [
			'style?sourceMap',
			'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
		]
		}]
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.ProvidePlugin({
		$: 'jquery',
		jQuery: 'jquery',
		'window.jQuery': 'jquery'
		})
	]
};
