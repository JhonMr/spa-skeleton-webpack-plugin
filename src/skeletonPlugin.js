
const htmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')
const getScript = require('./scriptTag')
const pluginName = 'HtmlWebpackPlugin'

class Skeleton {
  constructor (options) {
    this.wrapEl = options.wrapEl || '#app'
    this.mode = options.mode || "'hash'";
    this.htmlTemplateHandler = options.htmlTemplateHandler;
    if(!options.templates || typeof options.templates !== 'object') options.templates = [];
    else if(!options.templates instanceof Array) options.templates = [options.templates];
    this.templates = options.templates ;
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
    compiler.hooks.compilation.tap(pluginName, compilation=>{
      const htmlWebpackPluginBeforeHtmlProcessing = compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing || htmlWebpackPlugin.getHooks(compilation).afterTemplateExecution
      htmlWebpackPluginBeforeHtmlProcessing.tapAsync(pluginName, (htmlPluginData, cb)=>{
        let html = htmlPluginData.html;
        if(this.htmlTemplateHandler && this.htmlTemplateHandler instanceof Function)  {
          html = this.htmlTemplateHandler(html) || html;
        }
        if(html.indexOf('<!--skeletonScript-->') > -1) {
          const script = getScript(this.wrapEl, this.mode, this.templates)
          html = html.replace('<!--skeletonScript-->', script)
        }
        htmlPluginData.html = html
        cb(null, htmlPluginData)
      })
    })
  }
}

module.exports = Skeleton
