/*
*  for webpack3
* */
const htmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')
const getScript = require('./scriptTag')

class Skeleton {
  constructor (options) {
    this.wrapEl = options.wrapEl || '#app'
    this.mode = options.mode || "hash"
    this.templates = options.templates
    this.templates.forEach(item=>{
      fs.readFile(item.template, 'utf-8', function(err, data) {
        if(!err)
          item.template = data.toString()
        else
          item.template = ''
      })
    })
  }
  apply (compiler) {
    compiler.plugin('compilation', compilation=>{
      compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, cb)=>{
        let html = htmlPluginData.html;
        if(this.htmlTemplateHandler && this.htmlTemplateHandler instanceof Function)  {
          html = this.htmlTemplateHandler(html) || html;
        }
        if(html.indexOf('<!--skeletonScript-->') > -1) {
          const script = getScript(this.wrapEl, this.mode, this.templates)
          htmlPluginData.html = html.replace('<!--skeletonScript-->', script)
          cb(null, htmlPluginData)
        }
      })
    })
  }
}

module.exports = Skeleton
