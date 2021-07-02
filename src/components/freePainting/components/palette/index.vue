<template>
  <div id="palette" class="palette" ref="palette" v-show="show">
    <div class="palette_preview" :style="{ 'backgroundColor': rgbaText}"></div>
    <div class="palette_main">
      <ul class="palette_input">
        <li v-for="item in rgbaItem" :key="item.id">
          <span class="input_title">{{ item.name }}</span>
          <input class="input_main" type="text" v-model="item.result" @input="change">
          <input class="input_range" type="range" v-model="item.result" :min="item.min" :max="item.max" :step="item.step"
                 @input="change">
        </li>
      </ul>
      <div class="palette_result">
        <div class="rgba">
          <span class="input_title">rgba:</span>
          <input class="input_main" type="text" v-model="rgbaText" @blur="changeRgba">
        </div>
        <div class="hexadecimal">
          <span class="input_title">十六进制：</span>
          <input class="input_main" type="text" v-model="hexadecimalText" @blur="changeHex">
          <span class="error_msg">{{ hexErrorMsg }}</span>
        </div>
      </div>
    </div>
    <div class="palette_footer">
      <button class="button" @click="cancle">取消</button>
      <button class="button" @click="confirm">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      rgbaItem: [
        { id: 1, name: '红色(R)', result: '0', min: 0, max: 255, step: 1 },
        { id: 2, name: '绿色(G)', result: '186', min: 0, max: 255, step: 1 },
        { id: 3, name: '蓝色(B)', result: '189', min: 0, max: 255, step: 1 },
        { id: 4, name: '透明(O)', result: '1', min: 0, max: 1, step: 0.1 },
      ],
      rgbaText: 'rgba(0, 186, 189, 1)',
      hexadecimalText: '#00BABD',
      cache: {
        rgbaText: 'rgba(0, 186, 189, 1)',
        hexadecimalText: '#00BABD'
      },
      hexErrorMsg: ''
    }
  },
  mounted () {
    this.init()
    this.$emit('getResultColor', this.cache)
  },
  watch: {
    'show': {
      handler (newVal) {
        if (!newVal) {
          this.changeRgbaItem(this.cache.rgbaText)
          this.rgbaText = this.cache.rgbaText
          this.hexadecimalText = this.cache.hexadecimalText
        } else {
          this.$emit('getResultColor', this.cache)
        }
      },
      immediate: true
    }
  },
  methods: {
    init () {
      this.$refs.palette.parentNode.style.position = 'relative'
    },
    change () {
      this.rgbaText = `rgba(${this.rgbaItem[0].result}, ${this.rgbaItem[1].result}, ${this.rgbaItem[2].result}, ${this.rgbaItem[3].result})`
      this.hexadecimalText = this.RGBAToHex(this.rgbaText)
    },
    cancle () {
      this.$emit('update:show', false)
    },
    confirm () {
      this.cache = {
        rgbaText: this.rgbaText,
        hexadecimalText: this.hexadecimalText
      }
      this.$emit('getResultColor', this.cache)
      this.$emit('update:show', false)
      this.$parent.setColor(true)
    },
    changeRgba () {
      this.hexadecimalText = this.RGBAToHex(this.rgbaText)
      this.changeRgbaItem(this.rgbaText)
    },
    changeHex () {
      let result = this.HexToRGBA(this.hexadecimalText)
      if (result !== 'error') {
        this.hexErrorMsg = ''
        this.rgbaText = result
        this.changeRgbaItem(this.rgbaText)
      } else {
        this.hexErrorMsg = '无效'
      }
    },
    changeRgbaItem (rgbaText) {
      let arr = rgbaText.slice(5, rgbaText.length - 1).replace(/\s*/g, '').split(',')
      this.rgbaItem[0].result = arr[0]
      this.rgbaItem[1].result = arr[1]
      this.rgbaItem[2].result = arr[2]
      this.rgbaItem[3].result = arr[3]
    },
    RGBAToHex (color) {
      var values = color
        .replace(/rgba?\(/, '')
        .replace(/\)/, '')
        .replace(/[\s+]/g, '')
        .split(',')
      var a = parseFloat(values[3] || 1),
        r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
        g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
        b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255)
      return '#' +
        ('0' + r.toString(16).toUpperCase()).slice(-2) +
        ('0' + g.toString(16).toUpperCase()).slice(-2) +
        ('0' + b.toString(16).toUpperCase()).slice(-2)
    },
    HexToRGBA (color) {
      var pattern = /^#([0-9|a-f|A-F]{3}|[0-9|a-f|A-F]{6})$/
      if (color && pattern.test(color)) {
        if (color.length == 4) {
          // 将三位转换为六位
          color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3]
        }
        //处理六位的颜色值
        var colorNew = []
        for (var i = 1; i < 7; i += 2) {
          if (i === 1) {
            colorNew.push((parseInt('0x' + color.slice(i, i + 2))))
          } else {
            colorNew.push((' ' + parseInt('0x' + color.slice(i, i + 2))))
          }
        }
        return 'rgba(' + colorNew.join(',') + ', 1)'
      }
      return 'error'
    }
  }
}
</script>

<style lang="less" scoped>
.palette {
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translate(-50%);
  width: 250px;
  height: 315px;
  padding: 10px;
  box-sizing: content-box;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .palette_preview {
    width: 100%;
    height: 100px;
  }
  .palette_main {
    .palette_input {
      margin-top: 10px;
      .input_title {
        display: inline-block;
        width: 48px;
        margin-right: 5px;
      }
      .input_main {
        width: 60px;
        margin-bottom: 5px;
        margin-right: 5px;
        padding: 0 15px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        text-align: center;
        color: #606266;
        outline: none;
        box-sizing: border-box;
      }
      .input_range {
        cursor: pointer;
        // 滑块样式
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 10px;
          height: 10px;
          margin-top: -7px;
        }
        // 轨道样式
        &::-webkit-slider-runnable-track {
          width: 80px;
          height: 2px;
          margin-top: -12px;
          background-color: #666;
        }
      }
    }
    .palette_result {
      margin-top: 10px;
      .input_title {
        display: inline-block;
        width: 70px;
        margin-bottom: 8px;
      }
      .input_main {
        width: 135px;
        margin-bottom: 5px;
        padding: 0 5px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        text-align: center;
        font-size: 12px;
        color: #606266;
        outline: none;
        box-sizing: border-box;
      }
      .error_msg {
        margin-left: 5px;
        font-size: 12px;
        color: rgb(211, 26, 26);
      }
    }
  }
  .palette_footer {
    display: flex;
    justify-content: space-around;
    .button {
      width: 50px;
    }
  }
}
</style>
