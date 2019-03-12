module.exports = function getScript (el, mode, templates) {
  const html = `<script>
  (function(){
    var templates = ${JSON.stringify(templates)}
    var mode = "${mode}"
    var path = mode.indexOf('hash')>-1 ? window.location.hash.slice(1) : window.location.pathname
    var app = document.querySelector('${el}')
    var skeleton = ''
    templates.find(function(temp) {
      if(
        temp.routes === path ||
        (temp.routes instanceof RegExp && temp.routes.test(path)) ||
        (temp.routes instanceof Array && (temp.routes.some(function(item){ return (item instanceof Object && new RegExp(item.pattern, item.attributes).test(path)) || item===path })) )
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
