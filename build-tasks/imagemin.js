const glob = require('glob');
const path = require('path')
const fs = require('fs')

const { promisify } = require('util')

const fileGlob = promisify(glob)
const mkdir = promisify(fs.mkdir)
const writeFile = promisify(fs.writeFile)

const imagemin = require('imagemin')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')

module.exports = function(sourceConfig, options = {}) {

  options = {
    sourceBasePath: 'resources/assets',
    source: ['resources/assets/img/**/*.{jpg,jpeg,png}'],
    destinationBasePath: 'public',
    jpegtran: {},
    pngquant: {
      quality: [0.8, 0.9]
    },
    ...options
  }

  return imagemin(options.source, {
    destination: options.destination,
    plugins: [
      imageminJpegtran(options.jpegtran),
      // imageminPngquant(options.pngquant),
    ],
  }).then(files => {
    return Promise.allSettled(

      files.map((file) => {

        let desintationPath = path.join(options.destinationBasePath, file.sourcePath.replace(options.sourceBasePath, ''))

        return ((file) => {
          let desintationDirectory = path.dirname(desintationPath)

          return mkdir(desintationDirectory, {recursive: true})
            .then(() => {
              return writeFile(desintationPath, file.data)
            })
        })(file);

      })
    )
  })
}
