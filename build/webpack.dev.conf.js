const merge = require('webpack-merge')
const os = require('os')
const path = require('path')
const webpack = require('webpack')

const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')
const loaderConfigs  = require('./helpers/loaderConfigs')
const utils = require('./helpers/utils')

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'happypack/loader?id=ts'
      },

	    {
        exclude: [
          utils.resolvePath('src/styles.scss')
        ],
        test: /\.css$/,
        loader: 'happypack/loader?id=scss'
      },

      // Global stylesheet
      {
        include: [
          utils.resolvePath('src/styles.scss')
        ],
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
		      {
			      loader: 'sass-loader',
            options: {
              outputStyle: 'expanded'
            }
		      }
        ]
      },

      // Suppress warnings for System.import() deprecation
      // Dont really care how modules are included in development
	    {
		    test: /[\/\\]@angular[\/\\].+\.js$/,
		    parser: {
		      system: true
		    }
      }
    ]
  },

  // Port set at end of config
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: process.env.HOST || config.dev.host,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? {
      warnings: true,
      errors: true,
    } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // Necessary for FriendlyErrorsPlugin
    watchOptions: {
      aggregateTimeout: config.dev.aggregateTimeout,
      poll: config.dev.poll,
    },
    inline: true,
    progress: true
  },
  stats: 'detailed',

  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      checkSyntacticErrors: true,
      tsconfig: utils.resolvePath('config/tsconfig.app.json'),
      tslint: utils.resolvePath('config/tslint.json'),
      watch: utils.resolvePath('src'),
      workers: Math.floor(os.cpus().length / 2)
    }),

    loaderConfigs.generateHappyPackTS({
      errorFormatter: utils.tsConfErrorFormatter,
      happyPackMode : true,
      transpileOnly: true,
      configFile: utils.resolvePath('config/tsconfig.app.json')
    }),

    loaderConfigs.generateHappyPackSCSS({
      sourceMap: config.dev.cssSourceMap
    }),

    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),

    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunksSortMode: (a, b) => {
        const entryPoints = ['inline', 'polyfills', 'sw-register', 'styles', 'vendor', 'main']
        return entryPoints.indexOf(a.names[0]) - entryPoints.indexOf(b.names[0])
      }
    }),
    new webpack.NamedModulesPlugin(),

    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      utils.resolvePath('src')
    )
  ],

  optimization: {
    namedModules: true
  }
})

// Config finalization
// Gets free port and assigns to dev-server
// Also adds Friendly-Errors plugin
async function getDevConfig() {
  const basePort = process.env.PORT || config.dev.port
  const devPort = await utils.getFreePort(basePort)

  process.env.PORT = devPort

  devWebpackConfig.plugins.push(
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [
          'Your application is running here: '
          + `http://${devWebpackConfig.devServer.host}:${devPort}`
        ]
      },
      onErrors: (config.dev.notifyOnErrors
      ? utils.createNotifierCallback()
      : undefined),
      clearConsole: false
    })
  )

  return devWebpackConfig
}

module.exports = getDevConfig()
