<template>
  <div class="free">
    <canvas class="canvas" ref="canvas" :width="width" :height="height" @click="addOrigin"
            @mousedown="drawLine">你的浏览器不支持canvas</canvas>
    <div class="free_toolbar" v-if="type == 'line'">
      <div class="free_toolbar_size">
        <ul class="size-control" ref="sizeControl">
          <li class="mini active" data-size="2" @click="changeSize" @mouseenter="tooltip($event, '画笔大小：2px')"></li>
          <li class="normal" data-size="4" @click="changeSize" @mouseenter="tooltip($event, '画笔大小：4px')"></li>
          <li class="large" data-size="6" @click="changeSize" @mouseenter="tooltip($event, '画笔大小：6px')"></li>
        </ul>
      </div>
      <div class="free_toolbar_color">
        <ul class="color-control" ref="colorControl">
          <li v-for="(item, index) in toolbarColor" :key="index" :class="{'active':!index && toolbarColor.length }"
              :style="`background-color: ${item}`" :data-color="item" @click="changeColor"
              @mouseenter="tooltip($event, `画笔颜色：${item}`)">
          </li>
          <li ref="all" data-color="all" @click="changeColor" :style="`background-color: ${paletteColor}`"
              @mouseenter="tooltip($event, `画笔颜色：${paletteColor}，点击后选择切换`)">
            <palette :show.sync="paletteShow" @getResultColor="getResultColor" />
          </li>
        </ul>
      </div>
      <div class="free_toolbar_eraser">
        <svg-icon id="prev" icon-name="icon-prev" @mouseenter.native="tooltip($event, '上一步')" @click="prev"></svg-icon>
        <svg-icon id="next" icon-name="icon-next" @mouseenter.native="tooltip($event, '下一步')" @click="next"></svg-icon>
      </div>
      <div class="free_toolbar_reset">
        <!-- <svg-icon id="rubber" icon-name="icon-rubber" width="21" height="22" @mouseenter.native="tooltip($event, '擦除')"
                  @click="erase">
        </svg-icon> -->
        <svg-icon id="reset" icon-name="icon-reset" width="21" height="22" @mouseenter.native="tooltip($event, '重置')"
                  @click="resetCanvas">
        </svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
import svgIcon from './components/svgIcon'
import palette from './components/palette'
export default {
  name: 'freePainting',
  components: {
    svgIcon,
    palette
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
      default: () => ['black', 'red', 'green', 'blue']
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
      activeColor: this.toolbarColor.length ? this.toolbarColor[0] : 'black',
      activeSize: '2',
      firstImgData: null,
      imgStack: [],
      activeIndex: 0,
      paletteColor: 'rgba(0, 186, 189, 1)',
      paletteShow: false,
      resultColor: ''
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    'paletteShow' (newVal) {
      if (!newVal) {
        this.setColor(false)
      }
    }
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
      this.firstImgData = this.context.getImageData(0, 0, this.width, this.height)
      this.imgStack.push(this.firstImgData)
      if (this.type == 'line') {
        this.$refs.canvas.classList.add('cursor')
        this.setColor(false)
      }
    },
    // 加点
    addOrigin (event) {
      if (!this.tips.status) return console.warn(this.tips.message)
      if (this.type !== 'origin') return
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
    drawLine (event) {
      if (this.type !== 'line') return
      this.operationStatus = true
      this.imgStack = this.imgStack.splice(0, this.activeIndex + 1)
      let mx = event.layerX,
        my = event.layerY
      this.context.beginPath()
      this.context.moveTo(mx, my)
      this.mousemove()
      this.mouseup()
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
      // 阻止子元素触发点击事件
      if (e.currentTarget !== e.target) return
      this.$refs.colorControl.childNodes.forEach(item => {
        item.classList.remove('active')
      })
      e.target.classList.add('active')
      if (e.target.getAttribute('data-color') == 'all') {
        this.paletteShow = true
        this.setColor(true)
      } else {
        this.paletteShow = false
        this.activeColor = e.target.getAttribute('data-color')
      }
    },
    // 鼠标移动
    mousemove () {
      if (!this.tips.status) return console.warn(this.tips.message)
      if (this.type !== 'line') return
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
      document.onmouseup = () => {
        this.operationStatus = false
        this.$refs.canvas.onmousemove = null
        document.onmouseup = null
        let imgData = this.context.getImageData(0, 0, this.width, this.height)
        this.imgStack.push(imgData)
        this.activeIndex = this.imgStack.length - 1
        this.saveImage()
      }
    },
    // 上一次操作记录
    prev () {
      let timer = null
      document.getElementById('prev').style = 'position: relative; top: 1px; left: 1px;'
      if (this.activeIndex > 0) {
        this.activeIndex--
        this.context.putImageData(this.imgStack[this.activeIndex], 0, 0)
      }
      timer = window.setInterval(() => {
        if (timer) window.clearInterval(timer)
        document.getElementById('prev').style = 'position: relative; top: 0; left: 0;'
      }, 200)
    },
    // 下一次操作记录
    next () {
      let timer = null
      document.getElementById('next').style = 'position: relative; top: 1px; left: 1px;'
      if (this.activeIndex < this.imgStack.length - 1) {
        this.activeIndex++
        this.context.putImageData(this.imgStack[this.activeIndex], 0, 0)
      }
      timer = window.setInterval(() => {
        if (timer) window.clearInterval(timer)
        document.getElementById('next').style = 'position: relative; top: 0; left: 0;'
      }, 200)
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
    erase () {

    },
    // 重置画布
    resetCanvas () {
      if (this.type == 'line') {
        this.activeIndex = -1
        this.imgStack = []
        this.imgStack.push(this.firstImgData)
        document.getElementById('reset').classList.remove('tooltip')
        document.getElementById('reset').classList.add('rotate')
        document.getElementById("reset").addEventListener("transitionend", () => {
          document.getElementById('reset').classList.remove('rotate')
        })
      }
      this.context.clearRect(0, 0, this.width, this.height)
      if (this.imgSrc) {
        this.context.drawImage(this.img, this.left, this.top, this.imgWidth, this.imgHeight)
        this.$nextTick(() => {
          this.img.src = this.imgSrc
        })
      }
    },
    // 获取调色板颜色
    getResultColor (color) {
      this.resultColor = color
    },
    // 将调色板颜色赋值给工具栏
    setColor (flag) {
      if (flag) {
        this.activeColor = this.resultColor.hexadecimalText
        this.paletteColor = this.resultColor.hexadecimalText
      } else {
        this.paletteColor = this.resultColor.hexadecimalText
      }
    },
    // 工具提示
    tooltip (e, tip) {
      e.target.style.position = 'relative'
      e.target.setAttribute('data-tip', tip)
      e.target.classList.add('tooltip')
      let timer = null
      timer = window.setInterval(() => {
        if (timer) window.clearInterval(timer)
        e.target.classList.remove('tooltip')
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
@import "./styles/tooltip.less";
.free {
  display: inline-block;
  .canvas {
    border: 1px solid #ccc;
  }
  .cursor {
    cursor: url("./assets/Write.cur"), auto;
  }
  .free_toolbar {
    display: flex;
    justify-content: start;
    width: 407px;
    height: 32px;
    padding: 5px 0;
    background-color: #7bbfea;
    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 22px;
      margin: 0;
      padding: 0;
      li {
        box-sizing: border-box;
        list-style: none;
      }
    }
    // 大小选择
    .free_toolbar_size {
      position: relative;
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
    // 颜色选择
    .free_toolbar_color {
      position: relative;
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
    // 后退与前进
    .free_toolbar_eraser {
      position: relative;
      padding: 0 10px;
      border-right: 1px solid #00ae9d;
    }
    // 重置
    .free_toolbar_reset {
      position: relative;
      padding: 0 10px;
      #rubber {
        margin-right: 10px;
      }
    }
    // 重置旋转效果
    .rotate {
      transition: transform 0.3s;
      transform: rotate(180deg);
      transform-origin: 10px 11px;
    }
  }
}
</style>
