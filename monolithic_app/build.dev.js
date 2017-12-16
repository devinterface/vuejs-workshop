
const s = require('shelljs')
const fs = require('fs')
const browserify = require('browserify')
const vueify = require('vueify')
const babelify = require('babelify')
s.rm('-rf', 'build')
require('babel-register')
browserify('./public/javascripts/main.js')
.transform(vueify)
.transform(babelify)
.bundle()
.pipe(fs.createWriteStream('./public/javascripts/bundle.js'))
require('./server')
