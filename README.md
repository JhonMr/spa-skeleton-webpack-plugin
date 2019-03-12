## spa-skeleton-webpack-plugin

A webpack plugin for single page web application. Help for build skeleton with different router.

#### Installation

npm install --save-dev spa-skeleton-webpack-plugin

#### Basic Use
##### Step1: configration

```
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SkeletonPlugin = require('spa-skeleton-webpack-plugin')
const path = require('path')
const webpackConfig = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index.bundle.js'
  },
  plugin: [
    new HtmlWebpackPlugin({
       // Your HtmlWebpackPlugin config
    }),
    new SkeletonPlugin({
        wrapEl: '#app',
        mode: 'hash',       //or history,
        templates: [
            {routes: '/', template: path.resolve(__dirname, `${customPath1}`},
            {routes: ['/search', '/list'], template: path.resolve(__dirname, `${customPath2}`},
            {
                routes: [
                    {pattern: '^/detail\\?id=\\d+', attributes: 'g'}   // RegExp config
                ],
                template: path.resolve(__dirname, `${customPath2}`
            }
        ]
    })
  ]
}
```

##### Step2: Modify template index.html of html-webpack-plugin
Add comment &lt;!--skeletonScript--$lg; after wrapEl of you application

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>cli3</title>
  </head>
  <body>
    <div id="app">
    </div>
    <!--skeletonScript-->

  </body>
</html>
```

##### CustomSkeletonFile

```
<style lang="text/css" scoped>
  .index p {color: #45fdee; font-size: 20px;}
</style>
<div class="index">
    <p>Index Skeleton</p>
</div>
```

#### License
MIT.
