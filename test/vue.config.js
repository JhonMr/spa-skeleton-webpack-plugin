var spaSkeletonPlugin = require('../index');
var path = require('path');
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },
    plugins: [
      new spaSkeletonPlugin({
        wrapEl: '#skeleton',
        mode: 'hash',
        templates: [
          { routes: ['/', '/detail'], template: path.resolve(__dirname, 'src/skeleton/list.html') },
        ],
        htmlTemplateHandler: function(htmlStr) {
          return htmlStr.replace(/<!-- @if DEV -->[\s\S]*?<!-- @end -->/gis, '');
        }
      })
    ]
  },
  devServer: {
    proxy: {
      '/getWangYiNews': {
        target: 'https://api.apiopen.top/',
        changeOrigin: true
      },
      '/dy': {
        target: 'https://3g.163.com/',
        changeOrigin: true
      }
    }
  }
}
