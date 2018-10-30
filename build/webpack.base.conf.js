const chalk = require('chalk')
const path = require('path')
const webpack = require('webpack')

const config = require('../config')
const utils = require('./helpers/utils')

const CircularDependencyPlugin = require('circular-dependency-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const WebpackInlineManifestPlugin = require('webpack-inline-manifest-plugin')

module.exports = {
  entry: {
    main: './src/main.ts',
    pollyfills: './src/polyfills.ts',
    styles: [
      './src/styles.scss'
    ]
  },

  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.js'],
    alias: {
      '@src': utils.resolvePath('src'),
      '@a': utils.resolvePath('src/app'),
      // https://github.com/ReactiveX/rxjs/blob/master/doc/lettable-operators.md#build-and-treeshaking
      ...utils.rxjsAlias(config.isSupportingES2015)
    }
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'raw-loader',
        exclude: [utils.resolvePath('index.html')]
      },

      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },

      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },

      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        query: {
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),

    new CircularDependencyPlugin({
      exclude: /(\\|\/)node_modules(\\|\/)/,
      failOnError: false
    }),

    new ProgressBarPlugin({
      format: `  Progress [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
      clear: false
    }),

    // Copy custom static assets
    new CopyWebpackPlugin([
      {
        from: utils.resolvePath('static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*'],
        debug: 'warning'
      }
    ]),

    // new WebpackInlineManifestPlugin()
  ],

  node: {
    clearImmediate: false,
    crypto: 'empty',
    fs: 'empty',
    global: true,
    module: false,
    net: 'empty',
    process: true,
    setImmediate: false,
    tls: 'empty'
  }
}
