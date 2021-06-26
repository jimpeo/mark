<template>
  <div class="free">
    <canvas class="canvas" ref="canvas" :width="width" :height="height" @click="handlerClick">你的浏览器不支持canvas</canvas>
    <div class="free_toolbar" v-if="type == 'line'">
      <div class="free_toolbar_size">
        <ul class="size-control" ref="sizeControl">
          <li class="mini active" data-size="2" @click="changeSize"></li>
          <li class="normal" data-size="4" @click="changeSize"></li>
          <li class="large" data-size="6" @click="changeSize"></li>
        </ul>
      </div>
      <div class="free_toolbar_color">
        <ul class="color-control" ref="colorControl">
          <li v-for="(item, index) in toolbarColor" :key="index" :class="{'active':!index && toolbarColor.length }"
              :style="`background-color: ${item}`" :data-color="item" @click="changeColor"></li>
          <li ref="all" data-color="all" @click="changeColor"></li>
        </ul>
      </div>
      <div class="free_toolbar_eraser">
        <svg-icon id="prev" icon-name="icon-prev" @click="prev"></svg-icon>
        <svg-icon id="next" icon-name="icon-next" @click="next"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
import svgIcon from './svgIcon'
export default {
  name: 'freePainting',
  components: {
    svgIcon
  },
  props: {
    // 标注类型
    type: {
      type: String,
      default: 'origin'
    },
    // 颜色工具栏
    toolbarColor: {
      type: Array,
      default: () => ['black', 'red', 'green', 'white']
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
    }
  },
  data () {
    return {
      context: null,
      tips: {
        status: true,
        message: ''
      },
      img: null,
      operationStatus: false,
      imgStack: [],
      activeIndex: 0
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 创建画布并将图片放到上面
    init () {
      if (isNaN(Number(this.width + this.height + this.top + this.left + this.imgWidth + this.imgHeight))) {
        this.tips = {
          status: false,
          message: '传入的尺寸不能带单位'
        }
        return console.warn(this.tips.message)
      }
      if (!this.$refs.canvas.getContext) {
        this.tips = {
          status: false,
          message: '获取canvas失败'
        }
        return console.warn(this.tips.message)
      }
      this.context = this.$refs.canvas.getContext("2d")
      var img = new Image()
      img.src = this.imgSrc
      if (this.imgSrc && !(img.fileSize < 0 || (img.width < 0 && img.height < 0))) {
        this.tips = {
          status: false,
          message: '传入的图片失效'
        }
        return console.warn(this.tips.message)
      }
      if (this.imgSrc) {
        // 保证图片加载完成后在进行操作
        img.onload = () => {
          this.context.drawImage(img, this.left, this.top, this.imgWidth, this.imgHeight)
        }
        this.img = img
      }
    },
    // 鼠标操作
    handlerClick () {
      if (!this.tips.status) {
        return console.warn(this.tips.message)
      }
      if (this.type == 'origin') {
        this.addOrigin()
      } else if (this.type == 'line') {
        this.drawLine()
      }
    },
    // 加点
    addOrigin (event) {
      let context = this.context
      if (!this.continuation) {
        // 重新渲染canvas
        context.clearRect(0, 0, this.width, this.height)
        if (this.imgSrc) {
          context.drawImage(this.img, this.left, this.top, this.imgWidth, this.imgHeight)
        }
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
    // 画线
    drawLine () {
      this.$refs.canvas.onmousedown = (event) => {
        this.operationStatus = true
        let mx = event.layerX,
          my = event.layerY
        this.context.beginPath()
        this.context.moveTo(mx, my)
        this.mousemove()
        this.mouseup()
      }
    },
    // 修改线条宽度
    changeSize (e) {
      this.$refs.sizeControl.childNodes.forEach(item => {
        item.classList.remove('active')
      })
      e.target.classList.add('active')
      this.activeSize = e.target.getAttribute('data-size')
    },
    // 修改线条颜色
    changeColor (e) {
      this.$refs.colorControl.childNodes.forEach(item => {
        item.classList.remove('active')
      })
      e.target.classList.add('active')
      this.activeColor = e.target.getAttribute('data-color')
      if (e.target.getAttribute('data-color') == 'all') {
        let dlgHelper = document.getElementById('dlgHelper')
        if (!document.all && window.ActiveXObject) return
        var sColor = dlgHelper.ChooseColorDlg()
        var color = sColor.toString(16)
        while (color.length < 6) color = "0" + color
        // window.color = color
        color = "#" + color
        this.$refs.all.style.backgroundColor = color
      }
    },
    // 鼠标移动
    mousemove () {
      this.$refs.canvas.onmousemove = (event) => {
        if (this.operationStatus) {
          let ex = event.layerX,
            ey = event.layerY
          this.context.lineTo(ex, ey)
          // 设置弧线宽度
          this.context.lineWidth = this.activeSize
          // 设置弧线颜色
          this.context.strokeStyle = this.activeColor
          this.context.stroke()
        }
      }
    },
    // 鼠标抬起
    mouseup () {
      this.$refs.canvas.onmouseup = () => {
        this.operationStatus = false
        this.$refs.canvas.onmousemove = null
        this.$refs.canvas.onmouseup = null
        let imgData = this.context.getImageData(0, 0, this.width, this.height)
        this.imgStack.push(imgData)
        this.activeIndex = this.imgStack.length - 1
        console.log(this.imgStack)
        this.saveImage()
      }
    },
    // 上一次操作记录
    prev () {
      if (timer) return
      let timer
      document.getElementById('prev').style = 'position: relative; top: 1px; left: 1px;'
      if (this.activeIndex > 0) {
        this.activeIndex--
        this.context.putImageData(this.imgStack[this.activeIndex], 0, 0)
      }
      timer = window.setInterval(() => {
        window.clearInterval(timer)
        document.getElementById('prev').style = 'position: relative; top: 0; left: 0;'
      }, 1000)
    },
    // 下一次操作记录
    next () {
      console.log(this.activeIndex)
      if (this.activeIndex < this.imgStack.length - 1) {
        this.activeIndex++
        this.context.putImageData(this.imgStack[this.activeIndex], 0, 0)
      }
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
      if (this.imgSrc) {
        this.context.drawImage(this.img, this.left, this.top, this.imgWidth, this.imgHeight)
      }
      this.$nextTick(() => {
        this.img.src = this.imgSrc
      })
    }
  }
}
</script>

<style lang="less" scoped>
.free {
  display: inline-block;
  .canvas {
    border: 1px solid #ccc;
  }
  .free_toolbar {
    display: flex;
    justify-content: start;
    width: 310px;
    height: 20px;
    padding: 5px 0;
    background-color: #7bbfea;
    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 20px;
      margin: 0;
      padding: 0;
      li {
        box-sizing: border-box;
        list-style: none;
      }
    }
    .free_toolbar_size {
      width: 25%;
      padding: 0 5px;
      border-right: 1px solid #00ae9d;
      .size-control {
        li {
          background-color: black;
          border-radius: 50%;
        }
        .mini {
          width: 6px;
          height: 6px;
        }
        .normal {
          width: 8px;
          height: 8px;
        }
        .large {
          width: 10px;
          height: 10px;
        }
        .active {
          background-color: #f2eada;
        }
      }
    }
    .free_toolbar_color {
      padding: 0 10px;
      border-right: 1px solid #00ae9d;
      .color-control {
        li {
          width: 20px;
          height: 20px;
          margin-left: 10px;
          border: 1px solid #293047;
          list-style: none;
        }
        li:first-child {
          margin-left: 0;
        }
        .active {
          border: 1px solid white;
        }
      }
    }
    .free_toolbar_eraser {
      padding: 0 10px;
      .icon {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
