# point

一款简洁高效的使用canvas实现的图片标注功能组件

## 预览地址

GitHub：https://jimpeo.github.io/mark/

## 使用方式

下载公共组件components中Point组件文件，直接放入需要的项目中即可。

### Attributes

| 参数         | 说明                   | 类型            | 可选值        | 默认值   |
| ------------ | ---------------------- | --------------- | ------------- | -------- |
| width        | 画布宽度               | string / number | —             | 130      |
| height       | 画布高度               | string / number | —             | 170      |
| imgSrc       | 图片地址               | string          | —             | —        |
| top          | 图片相对于画布的上边距 | string / number | —             | 0        |
| left         | 图片相对于画布的左边距 | string / number | —             | 0        |
| imgWidth     | 图片宽度               | string / number | —             | 130      |
| imgHeight    | 图片高度               | string / number | —             | 170      |
| radius       | 圆点半径               | string / number | —             | 5        |
| color        | 圆点填充颜色           | string          | —             | red      |
| frameColor   | 圆点边框颜色           | string          | —             | \#f3715c |
| continuation | 是否可以连续标注       | Boolean         | —             | false    |
| imgType      | 生成的图片格式类型     | string          | base64 / blob | base64   |

### Methods

| 参数            | 说明           | 回调参数   |
| --------------- | -------------- | ---------- |
| getGeneratedImg | 获取生成的图片以及当前的配置项 | img / config |

## 最后

持续更新中，感谢大家的支持！