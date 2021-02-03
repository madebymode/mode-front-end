const sharp = require('sharp')
const glob = require('glob');
const path = require('path')
const fs = require('fs')

export default responseImages(sourceConfig, options = {}) {

  sharp.concurrency(6);

  let sizeGlobs = Object.keys(sourceConfig)

  options = {
    sourceDir: 'resources/assets/img',
    destDir: 'public/img',
    ...options
  }

  let checkedDirs = [];
  sizeGlobs.forEach((globKey) => {

    let sizes = sourceConfig[globKey]

    let sourceBaseDirectory = options.sourceDir
    let destinationBaseDirectory = options.destDir

    let sourceGlob = path.join(sourceBaseDirectory, globKey)

    glob(sourceGlob, {}, function(err, files) {

      files.forEach((sourceFile) => {

        // Parse the different parts of the file to compile the destination file path
        let sourceDirname = path.dirname(sourceFile)
        let sourceExtension = path.extname(sourceFile)
        let sourceBasename = path.basename(sourceFile, sourceExtension);

        let destinationDirectory = path.join(destinationBaseDirectory, sourceDirname.replace(sourceBaseDirectory, ''))

        // Ensure the destination directory exists
        fs.mkdir(destinationDirectory, { recursive: true }, (err) => {
          if (err) {
            return console.warn(err);
          }

          // Generate the size for the current width
          sizes.forEach((size) => {
            sharp(sourceFile)
              .resize(size.width, null)
              .toFile(path.join(destinationDirectory, `${sourceBasename}${size.rename.suffix}${sourceExtension}`));
          })
        });
      })
    })
  })
}
