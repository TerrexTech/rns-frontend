const { argv } = require('yargs')
const fs = require('fs');
const merge = require('webpack-merge')
const ngcWebpack = require('ngc-webpack')
const path = require('path')
const webpack = require('webpack')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer/lib/BundleAnalyzerPlugin')
const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { PurifyPlugin } = require('@angular-devkit/build-optimizer')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')
const loaderConfigs  = require('./helpers/loaderConfigs')
const utils = require('./helpers/utils')

const styleLoaders = loaderConfigs.getProdStyleLoaders({
  sourceMap: config.build.cssSourceMap
})

if (argv.report || config.build.bundleAnalyzerReport) {
  console.log(
    '> Bundle report will be displayed post compilation.\n\n'
  )
}

const webpackConfig = merge(baseWebpackConfig, {
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  mode: 'production',
  module: {
    rules: ([
	    {
    		test: '/\.ts$/',
  	  	use: [
          {
            loader: 'tslint-loader',
            options: {
              configFile: utils.resolvePath('tslint.json'),
              emitErrors: true,
              failOnHint: true,
              typeCheck: true,
              tsConfigFile: utils.resolvePath('config/tsconfig.app.json')
            }
          }
	  	  ]
	    },

      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: [
          {
            loader: '@angular-devkit/build-optimizer/webpack-loader',
            options: {
              sourceMap: config.build.productionSourceMap
            }
          },
          {
            loader: '@ngtools/webpack'
          }
        ]
      },

      // Extract global styles into separate css file
      {
        include: [
          utils.resolvePath('src/styles.scss')
        ],
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: config.build.productionSourceMap,
              importLoader: 2
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded'
            }
          }
        ]
      }
    ]).concat(styleLoaders)
  },

  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[name].[chunkhash].js'),
    sourceMapFilename: '[file].map',
  },
  stats: 'normal',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.build.env
    }),

    new HashedModuleIdsPlugin(),

    // See https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        caseSensitive: true,
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeAttributeQuotes: false,
        removeComments: true
        // More options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      chunksSortMode: (a, b) => {
        const entryPoints = ['inline', 'polyfills', 'sw-register', 'styles', 'vendor', 'main']
        return entryPoints.indexOf(a.names[0]) - entryPoints.indexOf(b.names[0])
      }
    }),

    new MiniCssExtractPlugin({
      filename: `${config.build.assetsSubDirectory}/styles/[name].[contenthash].css`
    }),

    new ngcWebpack.NgcWebpackPlugin({
	    AOT: true,
      basePath: utils.resolvePath(''),
      hostReplacementPaths: {
        [ utils.resolvePath('src/environments/environment.ts') ]
        : utils.resolvePath('config/tsconfig.env.prod.ts')
      },
      mainPath: utils.resolvePath('src/main.ts'),
      sourceMap: config.build.productionSourceMap,
      tsConfigPath: utils.resolvePath('config/tsconfig.app.json')
    }),

    new PurifyPlugin({
		  info: true
	  })
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: config.build.productionSourceMap,
        parallel: true,
        cache: utils.resolvePath('build-cache/uglify-cache'),
        uglifyOptions: {
          ecma: config.build.isSupportingES2015 ? 6 : 5,
          ie8: false,
          mangle: true,
          output: {
            ascii_only: true,
            comments: false
          },
          compress: {
            pure_getters: true,
            passes: 2
          },
        }
      }),
    ],
    splitChunks: {
      chunks: 'all'
    },
    noEmitOnErrors: true,
    concatenateModules: true
  },

  node: {
    clearImmediate: false,
    crypto: 'empty',
    fs: 'empty',
    global: false,
    module: false,
    net: 'empty',
    process: false,
    setImmediate: false,
    tls: 'empty'
  }
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        `\\.(${config.build.productionGzipExtensions.join('|')})$`
      ),
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: true
    })
  )
}

module.exports.getProdConfigPromise = async () => {
  if (argv.report) {
    try {
      const analyzerPort = await utils.getFreePort(8888)

      webpackConfig.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerHost: '127.0.0.1',
          analyzerPort
        })
      )
    }
    catch(e) {
      console.log(
        'Error finding port for Bundle Analyzer. Bundle Analyzer will be disabled.'
        + ` Reported Error: ${e}`
      )
    }
  }

  return webpackConfig
}
