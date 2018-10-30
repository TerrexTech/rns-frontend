const devEnv = require('./dev.env')
const path = require('path')
const prodEnv = require('./prod.env')

const baseBuildPath = path.resolve(__dirname, '../dist')
module.exports = {
  build: {
    assetsPublicPath: '/',
    assetsRoot: baseBuildPath,
    assetsSubDirectory: 'static',
    // Run the build:nodeploy command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build:nodeploy --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
    env: prodEnv,
    index: `${baseBuildPath}/index.html`,
    isSupportingES2015: true,
    port: 8080,
    // Gzip off as per plans to implement Nginx Reverse Proxy
    // Set to true to enable
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    productionSourceMap: false
  },

  dev: {
    autoOpenBrowser: true,
    aggregateTimeout: 300,
    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
    cssSourceMap: true,
    env: devEnv,
    errorOverlay: true,
    host: 'localhost',
    // Dev-Server polling for filesystem changes
    poll: false,
    port: 8080,
    proxyTable: {}
  }
}
