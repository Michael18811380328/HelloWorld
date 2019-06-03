// test webpack.config.js
module.exports = {
	entry: './index.js',
	output: {
		path: __dirname,
		filename: 'index.min.js'
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader:"style-loader!css-loader"  }
		]
	}
};
