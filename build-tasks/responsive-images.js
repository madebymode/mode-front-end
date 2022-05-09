const gm = require('gm')
const glob = require('glob');
const path = require('path')
const fs = require('fs')

const { promisify } = require('util')

const fileGlob = promisify(glob)
const mkdir = promisify(fs.mkdir)

module.exports = function(sourceConfig, options = {}) {

  // sharp.concurrency(6);

  let sizeGlobs = Object.keys(sourceConfig)

  options = {
    sourceDir: 'resources/assets/img',
    destDir: 'public/img',
    ...options
  }

  let checkedDirs = [];
  return Promise.allSettled(
    sizeGlobs.map((globKey) => {

      let sizes = sourceConfig[globKey]
      let sourceBaseDirectory = options.sourceDir
      let destinationBaseDirectory = options.destDir

      let sourceGlob = path.join(sourceBaseDirectory, globKey)

      return fileGlob(sourceGlob, {})
        .then((files) => {
          return Promise.allSettled(

            files.map((sourceFile) => {

              // Parse the different parts of the file to compile the destination file path
              let sourceDirname = path.dirname(sourceFile)
              let sourceExtension = path.extname(sourceFile)
              let sourceBasename = path.basename(sourceFile, sourceExtension);

              // Get the full destination path for the file removing the source base directory
              let destinationDirectory = path.join(destinationBaseDirectory, sourceDirname.replace(sourceBaseDirectory, ''))

              return mkdir(destinationDirectory, { recursive: true })
                .then(() => {
                  return Promise.allSettled(
                    sizes.map((size) => {
                      let destinationFile = path.join(destinationDirectory, `${sourceBasename}${size.rename.suffix}${sourceExtension}`)

                       return gm(sourceFile)
                         .resize(size.width, null)
                         .write(destinationFile, function(err) {
                            if (err) {
                              console.warn(err)
                              return;
                            }

                            console.log(destinationFile)
                         })
                         .then((info) => {
                           info.file = destinationFile
                           return info
                         })
                    })
                  )
                })
             })
          )
        })
    })
  )
}
