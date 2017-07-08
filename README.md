# 主题

此主题基于官方的主题进行修改完成。虽然从网上找到了[bitcron-colachan https://github.com/greenzorro/bitcron-colachan](https://github.com/greenzorro/bitcron-colachan)(应该是原作者吧)，但其中的大多数内容都是写死的，这直接让我放弃了使用，虽然技术能力有限，但还是觉得可配置才更通用，更人性化，所以这个主题便诞生了。

- 不使用pure，而换做了[ZUI - http://zui.sexy](http://zui.sexy)

- 将scss换为编译后的css。

- 修复官方主题中的诸多显示问题。

- [tag(tag+tags.jade)](./tag+tags.jade)

- 新增 [归档页面 (archive.jade)]("./archive.jade")

## changelog

- 08/Jul 2017
  - 简化搜索实现，直接使用表单提交即可
  - 拆分出header、footer
  - 修改了搜索页的展现，与默认首页有所不同，并且不展示背景了
  - 修复了分页的实现

- 06/Jul 2017 
  - 新增归档页，在归档页
  - 移除原 font.css
  - 去掉 footer 的内边距

## 未完成内容

- `base.jade` 不够细化，扩展性不够，需要将其进一步拆分 （add at 06/Jul 2017）

- 上下一篇效果优化，显示为图片背景+名称时间tags模式

- 阅读页目录宽屏下使用侧边模式

- 目录点击动画缓动。

- 重现实现回顶部。

- 首页优化。

- 关于页面。
