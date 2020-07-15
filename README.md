# [leoutil](https://github.com/leochan2017/util)

![By Leo](https://img.shields.io/badge/Powered_by-Leo-red.svg?style=flat)
![npm](https://img.shields.io/npm/dt/util)
![GitHub file size in bytes](https://img.shields.io/github/size/leochan2017/util/dist/util.min.js)
![GitHub last commit](https://img.shields.io/github/last-commit/leochan2017/util.svg)
![GitHub package.json version](https://img.shields.io/github/package-json/v/leochan2017/util)
![Hex.pm](https://img.shields.io/hexpm/l/plug.svg)

Leo 公共工具库

## :open_file_folder: 目录介绍

```
.
├── dist 编译产出代码
└── src 源代码目录
```

## :rocket: 快速开始

### 1. 引入本库

1.1 如果你是浏览器环境

```html
<script src="./dist/leoutil.min.js"></script>
```

1.2 如果你是 webpack 等环境

```shell
npm install leoutil --save
```

或者

```shell
yarn add leoutil
```

然后

```js
import leoutil from 'leoutil'
```

1.3 如果你是 requirejs 环境

```js
requirejs(['./dist/leoutil.min.js'], function (res) {
  // xxx
})
```

### 2. 使用

```js
console.log(leoutil.isDD())
```

## :bookmark_tabs: AIP 文档

### leoutil.isDD()

返回当前是否钉钉环境; true: 是, false: 否

## :couple: 谁在使用

- [Landray](http://www.landray.com.cn)

## :see_no_evil: 相关链接

- [Github Pages](https://leochan2017.github.io/util/)
- [仓库地址](https://github.com/leochan2017/util)
- [NPM 主页](https://www.npmjs.com/package/leoutil)
- [yarn 主页](https://yarn.pm/leoutil)
- [钉钉开放平台](https://open-doc.dingtalk.com/)
