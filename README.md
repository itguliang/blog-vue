# blog-vue

## 简单实现
列表
![](/screenshots/demo1.png)
详情
![](/screenshots/demo2.png)
编辑
![](/screenshots/demo3.png)

## 运行项目
```bash
$ git clone https://github.com/itguliang/blog-vue.git //clone 项目
$ npm install //安装依赖
$ npm run serve //启动
```

## 项目环境

- node : v10.11.0
- mongo : v4.0.2
- vue : 3.0.5
- 编辑器：https://github.com/hinesboy/mavonEditor

## 项目目录
```html
|-src
|-- components （组件） 
|-- views （页面） 
|-- router.js （路由）
|-- utils.js （工具）
```
## 问题

- vue cli 3.x 解决跨域问题：
根目录创建 `vue.config.js` 详见：https://cli.vuejs.org/zh/config/#devserver-proxy
```js
module.exports = {
  devServer: {
    proxy: 'target'
  }
}
```

<!-- - concurrently--npm run 执行多个命令
```js
"scripts": {
    "serve": "concurrently \"node server/index\" \"vue-cli-service serve\" "
}
``` -->
