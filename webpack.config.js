const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = env => {
    const isProduction = env === 'production'
 
  return {
    entry: path.join(__dirname, 'src','app.js') , //'./src/app.js',
    output: {
      path: path.join(__dirname, 'public'),
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
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    devtool: isProduction ? 'source-map': 'cheap-module-eval-source-map',
    devServer: {
      host: '192.168.86.235',
      port:'8080',
      contentBase: path.join(__dirname, 'public'),
      publicPath:'/dist/'
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'styles.css'
        })
    ]
  }
}

// loader
