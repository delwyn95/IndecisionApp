const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = env => {
  const isProduction = env === 'production'

  return {
    entry: path.join(__dirname, 'src', 'app.js'),
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          test: /\.s?css$/,
          use: [
						MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: true } },
            { laoder: 'sass-loader', options: { sourceMap: true } }
          ]
        }
      ]
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
			contentBase: path.join(__dirname, 'public'),
			publicPath: '/dist/',
		},
		plugins: [
			new MiniCssExtractPlugin({filename:'styles.css'})
		]
  }
}

// loader
