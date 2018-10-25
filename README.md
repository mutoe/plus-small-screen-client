<p align="center">
	<a href="http://www.thinksns.com" rel="noopener" target="_blank"><img src="https://github.com/slimkit/plus-small-screen-client/raw/master/public/plus.png" alt="Plus (ThinkSNS+) Logo"></a>
</p>

<h1 align="center">The Small Screen Client for <a href="https://github.com/slimkit/plus">Plus(ThinkSNS+)</a></h1>

<div align="center">

使用现代 Web 技术 [Vue.js](https://github.com/vuejs/vue) 编写的 [Plus(ThinkSNS+)](https://github.com/slimkit/plus) 浏览器单页客户端。


[![GitHub release](https://img.shields.io/github/release/slimkit/plus-small-screen-client.svg?style=flat-square)](https://github.com/slimkit/plus-small-screen-client/releases)
[![Build Status](https://img.shields.io/travis/com/slimkit/plus-small-screen-client/master.svg?style=flat-square)](https://travis-ci.com/slimkit/plus-small-screen-client)
[![QQ Group](https://img.shields.io/badge/QQ%20Group-651240785-red.svg?longCache=true&style=flat-square)](//shang.qq.com/wpa/qunwpa?idkey=01b61bdf8a7efc2a40ab4caab2d14793f340e5fe5d09aa0c2c17f3115a579678)

</div>

## 简介

这个浏览器单页客户端是项目使用 Apache-2.0 协议开源，基于 [Vue.js](https://github.com/vuejs/vue) 及 ES+ 等现代 Web 技术进行构建！
项目具有以下几个特点：

1. 易于分发，你可以将编译后文件分发到任何地方，不需要动态语言的支持。
2. 完全独立，你无需懂的后端程序，只需要调用文件化的 APIs 接口即可开发。
3. 高 App 还原，项目以 ThinkSNS+ 原生客户端为 UI 基准，进行高度还原。
4. 技术简单，我们使用中国接受度非常高的 [Vue.js](https://github.com/vuejs/vue) 进行开发，你可以快速入手。

## 安装

[Plus (ThinkSNS+) SPA 安装指南](https://slimkit.github.io/plus/guide/installation/install-spa.html)

## 配置

`.env` 文件配置说明：

```yaml
BASE_URL=/                                             # 我们假设你部署在一个域名下，所以默认 `/`, 例如你部署在子目录下，请设置子目录，必须以 `/` 结尾！
GENERATE_CSS_MAP=true                                  # 是否构建的时候生成 source map

VUE_APP_ENABLE_SERVICE_WORKER=false                    # 是否添加离线支持
VUE_APP_API_HOST=http://127.0.0.1                      # 你的 Plus 程序地址
VUE_APP_API_VERSION=v2                                 # 无需修改，目前支持的值只有 `v2`
VUE_APP_NAME="Plus (ThinkSNS+)"                        # 浏览器显示的程序名称
VUE_APP_KEYWORDS=                                      # 易于搜索引擎搜索的关键词
VUE_APP_DESCRIPTION=                                   # 你的网站描述
VUE_APP_ROUTER_MODE=hash                               # 路由模式，请参考下面的「路由模式」文档
VUE_APP_THEME=src/console/theme.js                     # 主题文件，暂时不支持修改
VUE_APP_EASEMOB_APP_KEY=#                              # 环信 APP KEY
VUE_APP_EASEMOB_API_URL=http://a1.easemob.com          # 环信接口地址
VUE_APP_EASEMOB_ISDEBUG=false                          # 是否开启环信 Debug
VUE_APP_LBS_GAODE_KEY=                                 # 高德地图 GAODE KEY
```

### 路由模式

路由模式支持 `hash` 和 `history` 两种模式，区别如下：

- `hash` 模式：无需后端支持，利用浏览器的「锚」功能进行路由定位。
- `history` 模式：需要后端的路由转发支持，正确设置的情况是所有请求都转发到 `index.html` 文件上

更加详细的描述请看 👉 [API 参考#mode](https://router.vuejs.org/zh/api/#mode)

### 跨域问题

你如果部署这个客户端到全新的地址中，那么你肯定会遇到跨域资源共享禁止问题，导致这个客户端无法正常工作。
在你安装完成 [Plus(ThinkSNS+)](https://github.com/slimkit/plus) 后，你可以进入 `/admin` 后台管理面板，然后你从左侧菜单点击「系统设置」
然后再从顶栏菜单选择 「安全」。

此时，你会看到一个 「跨域设置」设置，这个时候你应该咨询后端了解跨域资源共享的人，默认情况是允许所有跨域的，如果关闭了允许所有，请在 `Access-Control-Allow-Origin` 将程序的 host 添加进去即可！

## 开发部署

在项目中设置了三个有效命令：

- `serve` 用于开发，修改代码后会自动 Hot Reload
- `build` 用于正式部署的打包，执行完成后会多出一个 `dist/` 目录
- `lint`  用于代码检查和风格修复

## License

这个项目代码遵循 Apache 2.0 许可证发布，请参阅完整的 [许可证文本](https://github.com/slimkit/plus-small-screen-client/blob/master/LICENSE)

Copyright © 2018 Chengdu [ZhiYiChuangXiang](http://zhiyicx.com) Technology Co., Ltd. All rights reserved.
