<template>
  <div class="point">
    <canvas ref="canvas" :width="width" :height="height" @click="addOrigin">你的浏览器不支持canvas</canvas>
  </div>
</template>

<script>
export default {
  name: 'point',
  props: {
    // 是否渲染画布
    render: {
      type: Boolean,
      default: false,
      require: true
    },
    // 画布尺寸
    width: {
      type: [String, Number],
      default: '130'
    },
    height: {
      type: [String, Number],
      default: '170'
    },
    // 图片地址
    imgSrc: String,
    // 图片位于画布位置
    top: {
      type: [String, Number],
      default: '0'
    },
    left: {
      type: [String, Number],
      default: '0'
    },
    // 图片的大小
    imgWidth: {
      type: [String, Number],
      default: '130'
    },
    imgHeight: {
      type: [String, Number],
      default: '170'
    },
    // 圆点的半径
    radius: {
      type: [String, Number],
      default: '5'
    },
    // 点填充的颜色
    color: {
      type: String,
      default: 'red'
    },
    // 点边框颜色
    frameColor: {
      type: String,
      default: '#f3715c'
    },
    // 连续点
    continuation: {
      type: Boolean,
      default: false
    },
    // 获得图片的格式类型
    imgType: {
      type: String,
      default: 'base64'
    },
    // 禁用状态
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      context: null,
      img: null
    }
  },
  watch: {
    'render': {
      handler (newVal) {
        if (newVal) {
          this.$nextTick(() => {
            this.draw()
          })
        } else {
          if (this.context) {
            this.context.clearRect(0, 0, this.width, this.height)
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    // 创建画布并将图片放到上面
    draw () {
      if (!this.$refs.canvas.getContext) return console.warn('未获取到canvas')
      this.context = this.$refs.canvas.getContext("2d")
      if (!this.imgSrc) return console.warn('未获取到图片')
      var img = new Image()
      // 保证图片加载完成后在进行操作
      img.onload = () => {
        this.context.drawImage(img, this.left, this.top, this.imgWidth, this.imgHeight)
      }
      img.src = this.imgSrc
      this.img = img
    },
    // 加点
    addOrigin (event) {
      if (this.disabled || !this.render) return
      let context = this.context
      if (!this.continuation) {
        // 重新渲染canvas
        context.clearRect(0, 0, this.width, this.height)
        context.drawImage(this.img, this.left, this.top, this.imgWidth, this.imgHeight)
      }
      // 获取鼠标相对于canvas的点击位置坐标
      var x = event.clientX - this.$refs.canvas.getBoundingClientRect().left
      var y = event.clientY - this.$refs.canvas.getBoundingClientRect().top
      //开始一个新的绘制路径
      context.beginPath()
      var circle = {
        x: x,            //圆心的x轴坐标值
        y: y,            //圆心的y轴坐标值
        r: this.radius   //圆的半径
      }
      // 以canvas中的坐标点(x,y)为圆心，绘制一个半径为r的圆形
      // 参数说明：圆心x轴坐标、圆心y轴坐标、半径、弧度、顺时针或逆时针
      context.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2, true)
      // 设置弧线的颜色
      context.strokeStyle = this.frameColor
      // 设置填充颜色
      context.fillStyle = this.color
      // 开始填充
      context.fill()
      // 按照指定的路径绘制弧线
      context.stroke()
      this.saveImage()
    },
    // 保存图片
    saveImage () {
      const base64String = this.$refs.canvas.toDataURL()
      if (this.imgType == 'base64') {
        this.$emit('getGeneratedImg', base64String, this.$props)
      } else if (this.imgType == 'blob') {
        const data = window.atob(base64String.split(",")[1])
        const ia = new Uint8Array(data.length)
        for (let i = 0; i < data.length; i++) {
          ia[i] = data.charCodeAt(i)
        }
        const blob = new Blob([ia], { type: "image/png" })
        this.$emit('getGeneratedImg', blob, this.$props)
      }
    },
    // 重置画布
    resetCanvas () {
      this.context.clearRect(0, 0, this.width, this.height)
      this.context.drawImage(this.img, this.left, this.top, this.imgWidth, this.imgHeight)
      this.$nextTick(() => {
        this.img.src = this.imgSrc
      })
    }
  }
}
</script>

<style lang="less" scoped>
.point {
  display: inline-block;
  canvas {
    border: 1px solid #ccc;
  }
}
</style>
