<template>
  <div class="home">
    <div class="control">
      <div class="row">
        <aw-button-group class="flex" style="width: 33%">
          <aw-button size="mini" @click="uploadImg">上传图片</aw-button>
          <aw-button :type="genCanBtnStatus? 'danger':'success'" size="mini" @click="generateCanvas">生成画布</aw-button>
          <aw-button size="mini" @click="downloadImg">下载图片</aw-button>
        </aw-button-group>
        <input ref="upload" type="file" style="display: none" @change="getUploadedImg">
        <aw-button-group style="width: 33%;margin-left: 0">
          <span class="label">生成图片格式</span>
          <aw-button v-for="item in imgType" :key="item.id" :id="item.category" :disabled="!item.active" size="mini" @click="changeType">
            {{item.typeName}}</aw-button>
        </aw-button-group>
        <div>
          <span class="label">连续点</span>
          <aw-button v-for="item in continuationType" :key="item.id" :id="item.category" :disabled="!item.active" size="mini"
                     @click="changeContinuity">{{item.typeName}}</aw-button>
        </div>
      </div>
      <div class="row">
        <div style="width: 33%">
          <span class="label">画布尺寸</span>
          <aw-input size="mini" v-model="options.width"></aw-input>
          <span class="timessign"> * </span>
          <aw-input size="mini" v-model="options.height"></aw-input>
        </div>
        <div style="width: 33%">
          <span class="label">图片尺寸</span>
          <aw-input size="mini" v-model="options.imgWidth"></aw-input>
          <span class="timessign"> * </span>
          <aw-input size="mini" v-model="options.imgHeight"></aw-input>
        </div>
        <div>
          <span class="label">图片位置</span>
          <aw-input size="mini" v-model="options.top"></aw-input>
          <aw-input size="mini" v-model="options.left"></aw-input>
        </div>
      </div>
      <div class="row">
        <div style="width: 33%">
          <span class="label">圆点半径</span>
          <aw-input size="mini" v-model="options.radius"></aw-input>
        </div>
        <div style="width: 33%">
          <span class="label">圆点填充颜色</span>
          <aw-input class="large_input" size="mini" v-model="options.color"></aw-input>
        </div>
        <div>
          <span class="label">圆点边框颜色</span>
          <aw-input class="large_input" size="mini" v-model="options.frameColor"></aw-input>
        </div>
      </div>
      <div class="row">
        <div style="width: 33%">
          <span class="label">是否禁用</span>
          <aw-button v-for="item in disabledType" :key="item.id" :id="item.category" :disabled="item.active" size="mini"
                     @click="changeDisabled">{{item.typeName}}</aw-button>
        </div>
      </div>
      <div class="tip">调整属性后需要重新生成画布才能生效，生成画布按钮为红色时需要点击重新生成画布！建议：为了保证生成的图片没有透明区域，请配置图片尺寸与画布尺寸一致。</div>
    </div>
    <div class="imgarea">
      <div v-for="(item, index) in num" :key="item.id">
        <div style="display: flex; justify-content: space-around;">
          <aw-button size="mini" :disabled="item.render" @click="item.render = true">开</aw-button>
          <aw-button size="mini" :disabled="!item.render" @click="item.render = false">关</aw-button>
        </div>
        <div class="imgarea_tip">操作区域：</div>
        <point id="point" :render="item.render" :width="generateOptions.width" :height="generateOptions.height"
               :imgSrc="generateOptions.imgSrc" :imgWidth="generateOptions.imgWidth" :imgHeight="generateOptions.imgHeight"
               :top="generateOptions.top" :left="generateOptions.left" :radius="generateOptions.radius" :color="generateOptions.color"
               :frameColor="generateOptions.frameColor" :continuation="generateOptions.continuation"
               :imgType="generateOptions.imgTypeActive" :disabled="generateOptions.disabled"
               @getGeneratedImg="getGeneratedImg(arguments, index)" />
        <div class="imgarea_tip">生成的图像：</div>
        <div class="imgarea_main">
          <img :src="src[index].src" alt="" title="点击选择进行下载">
          <div class="shade" @click="selectImg($event, index)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import awButton from '@/components/AwUi/awButton'
import awButtonGroup from '@/components/AwUi/awButtonGroup'
import awInput from '@/components/AwUi/awInput'
import point from '@/components/Point'
import { formatCurrentDate } from '@/utils/format'
export default {
  components: {
    awButton,
    awButtonGroup,
    awInput,
    point
  },
  data () {
    return {
      imgType: [
        { id: 1, category: 'img', typeName: 'base64', active: false },
        { id: 2, category: 'img', typeName: 'blob', active: true }
      ],
      continuationType: [
        { id: 1, category: 'continuation', typeName: '是', active: true },
        { id: 2, category: 'continuation', typeName: '否', active: false }
      ],
      disabledType: [
        { id: 1, category: 'disabled', typeName: '是', active: false },
        { id: 2, category: 'disabled', typeName: '否', active: true }
      ],
      genCanBtnStatus: false,
      options: {
        width: 190,
        height: 170,
        imgSrc: require('@/assets/signal.jpg'),
        imgWidth: 190,
        imgHeight: 170,
        top: 0,
        left: 0,
        radius: 5,
        color: 'red',
        frameColor: '#f3715c',
        continuation: false,
        imgTypeActive: 'base64',
        disabled: false
      },
      generateOptions: {
        width: 190,
        height: 170,
        imgSrc: require('@/assets/signal.jpg'),
        imgWidth: 190,
        imgHeight: 170,
        top: 0,
        left: 0,
        radius: 5,
        color: 'red',
        frameColor: '#f3715c',
        continuation: false,
        imgTypeActive: 'base64',
        disabled: false
      },
      num: [
        { id: 1, render: true },
        { id: 2, render: true },
        { id: 3, render: true },
        { id: 4, render: true },
        { id: 5, render: true }
      ],
      src: [
        { src: '', selected: false, date: '' },
        { src: '', selected: false, date: '' },
        { src: '', selected: false, date: '' },
        { src: '', selected: false, date: '' },
        { src: '', selected: false, date: '' }
      ]
    }
  },
  watch: {
    'options': {
      handler (newVal) {
        if (newVal) {
          this.genCanBtnStatus = true
        }
      },
      deep: true
    }
  },
  methods: {
    changeType () {
      this.imgType.forEach(item => {
        item.active = !item.active
        if (!item.active) this.options.imgTypeActive = item.typeName
      })
    },
    changeContinuity () {
      this.continuationType.forEach(item => {
        item.active = !item.active
        if (item.typeName == '是' && !item.active) this.options.continuation = true
        else if (item.typeName == '否' && !item.active) this.options.continuation = false
      })
    },
    changeDisabled () {
      this.disabledType.forEach(item => {
        item.active = !item.active
        if (item.typeName == '是' && item.active) this.options.disabled = true
        else if (item.typeName == '否' && item.active) this.options.disabled = false
      })
    },
    getGeneratedImg (val, index = 0) {
      let img = val[0]
      if (this.generateOptions.imgTypeActive == "base64") {
        let member = {
          src: img,
          selected: false,
          date: formatCurrentDate()
        }
        this.$set(this.src, index, member)
      } else if (this.generateOptions.imgTypeActive == "blob") {
        let member = {
          src: URL.createObjectURL(img),
          selected: false,
          date: formatCurrentDate()
        }
        this.$set(this.src, index, member)
      }
    },
    generateCanvas () {
      this.generateOptions = JSON.parse(JSON.stringify(this.options))
      this.src = [
        { src: '', selected: false, date: '' },
        { src: '', selected: false, date: '' },
        { src: '', selected: false, date: '' },
        { src: '', selected: false, date: '' },
        { src: '', selected: false, date: '' }
      ]
      document.querySelectorAll('.mantle').forEach(item => {
        item.classList.remove('mantle')
      })
      document.querySelectorAll('#point').forEach(item => {
        item.__vue__.resetCanvas()
      })
      this.genCanBtnStatus = false
    },
    uploadImg () {
      this.$refs.upload.dispatchEvent(new MouseEvent('click'))
    },
    getUploadedImg () {
      let uploadedImg = this.$refs.upload.files[0]
      this.options.imgSrc = URL.createObjectURL(uploadedImg)
    },
    selectImg (event, index) {
      if (event.target.className == 'shade mantle') {
        event.target.classList.remove('mantle')
        this.src[index].selected = false
      } else {
        event.target.classList.add('mantle')
        this.src[index].selected = true
      }
    },
    downloadImg () {
      let selFlag, srcFlag = false
      this.src.forEach((item, index) => {
        if (item.src.length) srcFlag = true
        if (item.selected) {
          selFlag = true
          if (!!window.ActiveXObject || 'ActiveXObject' in window) {
            // ie兼容性处理
            window.open(item.src, '_blank')
          } else {
            let a = document.createElement('a')
            let e = document.createEvent('MouseEvents')
            e.initEvent('click', false, false)
            a.href = item.src
            a.download = `${item.date}生成的图像${index + 1}-point`
            a.dispatchEvent(e)
          }
        }
      })
      if (!srcFlag) return alert('未生成图片！')
      if (!selFlag) return alert('请选择图片！')
    }
  }
}
</script>

<style lang="scss" scoped>
.control {
  width: 1000px;
  margin: 0 auto 30px;
  padding-top: 50px;
  .row {
    display: flex;
    margin-bottom: 20px;
  }
  .label {
    display: inline-block;
    width: 100px;
    margin-right: 5px;
  }
  .aw_input {
    width: 70px;
  }
  .large_input {
    width: 80px;
  }
  .aw_button.is-disabled:hover {
    cursor: pointer;
  }
  .aw_button.is-disabled {
    color: black;
    border: 1px solid black;
  }
  .timessign {
    vertical-align: sub;
  }
  @keyframes tipColor {
    0% {
      color: red;
    }
    50% {
      color: yellowgreen;
    }
    100% {
      color: green;
    }
  }
  .tip {
    margin-top: -10px;
    margin-bottom: 10px;
    font-size: 12px;
    animation: tipColor 1s infinite;
  }
}
.imgarea {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .imgarea_tip {
    margin-top: 5px;
    margin-bottom: 10px;
    font-weight: 700;
  }
  .imgarea_main {
    position: relative;
    img {
      display: block;
    }
    .shade {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .mantle {
      background-color: rgba(0, 0, 0, 0.4);
      opacity: 0.5;
      z-index: 2;
      &::before {
        content: "";
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #ccc;
        z-index: 9;
      }
      &::after {
        content: "√";
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%);
        font-size: 30px;
        color: rgb(20, 218, 20);
        z-index: 10;
      }
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>