const config = require('../../config')
const path = require('path')
const portfinder = require('portfinder')

const resolvePath = dir => path.join(__dirname, '..', '..', dir)
exports.resolvePath = resolvePath

exports.assetsPath = _path => {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') {
      return
    }

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: `${severity}: ${error.name}`,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

exports.getFreePort = async (basePort = 8000) => {
  portfinder.basePort = basePort
  const port = await portfinder.getPortPromise()
  return port
}

exports.tsConfErrorFormatter = (error, colors) => {
  const messageColor = (error.severity === 'warning')
                       ? colors.bold.yellow
                       : colors.bold.red
  return 'Does not compute.... ' +
          messageColor(
            Object.keys(error).map(key => `${key}: ${error[key]}`)
          )
}

exports.rxjsAlias = isSupportingES2015 => {
  try {
    const rxjsPathMappingImport = isSupportingES2015 ? 'rxjs/_esm2015/path-mapping' : 'rxjs/_esm5/path-mapping'
    const rxPaths = require(rxjsPathMappingImport)
    return rxPaths(resolvePath('node_modules'))
  } catch (e) {
    return {}
  }
}
