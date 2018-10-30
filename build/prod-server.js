const deasync = require('deasync')
const express = require('express')
const morgan = require('morgan')
const path = require('path')

const config = require('../config')
const utils = require('./helpers/utils')

const expressStaticGzip = require('express-static-gzip')
const app = express()

app.use(morgan(
  ':remote-addr - :remote-user [:date[clf]] ":method :url'
  + ' HTTP/:http-version" :status :res[content-length] :response-time ms'
))

// Serve static assets
const staticPathMount = path.posix.join(
  config.build.assetsPublicPath,
  config.build.assetsSubDirectory
)
const staticPathLocation = path.posix.join(
  config.build.assetsRoot,
  config.build.assetsSubDirectory
)
app.use(staticPathMount, express.static(staticPathLocation))
app.use(staticPathMount, express.static(path.posix.join(config.build.assetsRoot)))
app.use(staticPathMount, expressStaticGzip(staticPathLocation))

// Force using angular-router to render on client
app.get('*', (req, res) => {
  res.sendFile(config.build.index)
})

async function createServer() {
  const prefPort = process.env.PORT || config.build.port
  const finalPort = await utils.getFreePort(prefPort)
  const server = app.listen(finalPort, () => {
    console.log(`\n\nApp listening on port ${finalPort}.`)
  })

  return server
}

const server = deasync(createServer)()

module.exports = {
  close: server.close
}
