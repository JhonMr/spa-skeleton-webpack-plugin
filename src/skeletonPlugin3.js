/*
*  for webpack3
* */
const htmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')
const pluginName = 'HtmlWebpackPlugin'
function getScript (el, mode, templates) {
  const html = `<script>
  (function(){
    var templates = ${JSON.stringify(templates)}
    var mode = "${mode}"
    var path = mode.indexOf('hash')>-1 ? window.location.hash.slice(1) : window.location.pathname
    var app = document.querySelector('${el}')
    var skeleton = ''
    templates.find(function(temp) {
      if(
        (temp.routes === path) ||
        (temp.routes instanceof RegExp && temp.routes.test(path)) ||
        (temp.routes instanceof Array && (temp.routes.some(function(item){ return (item instanceof RegExp && item.test(path)) || item===path })) )
      ) {
        skeleton = temp.template
        return true
      }
      return false
    })
    app.innerHTML = skeleton
  })()
  </script>`
  return html

}

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
        let html = htmlPluginData.html
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
