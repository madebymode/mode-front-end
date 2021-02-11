const glob = require('glob');
const path = require('path')
const fs = require('fs')

const { promisify } = require('util')

const fileGlob = promisify(glob)
const mkdir = promisify(fs.mkdir)

const imagemin = require('imagemin')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')

module.exports = function(sourceConfig, options = {}) {

  options = {
    sourc: ['public/img/*.{jpg,jpeg,png}'],
    destDir: 'public/img',
    jpegtran: {},
    pngquant: {
      quality: [0.9]
    },
    ...options
  }

  (async () => {

    await imagemin(options.source, {
      plugins: [
        imageminJpegtran(options.jpegtran),
        imageminPngquant(options.pngquant),
      ],
    })

  })()

  let checkedDirs = [];
  return Promise.allSettled()
}
