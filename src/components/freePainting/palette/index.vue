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
          <input class="input_main" type="text" :value="rgbaText">
        </div>
        <div class="hexadecimal">
          <span class="input_title">十六进制：</span>
          <input class="input_main" type="text" :value="hexadecimalText">
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
        { id: 4, name: '透明(O)', result: '1', min: 0.1, max: 1, step: 0.1 },
      ],
      rgbaText: 'rgba(0, 186, 189, 1)',
      hexadecimalText: '#00BABD'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$refs.palette.parentNode.style.position = 'relative'
    },
    change () {
      this.rgbaText = `rgba(${this.rgbaItem[0].result}, ${this.rgbaItem[1].result}, ${this.rgbaItem[2].result}, ${this.rgbaItem[3].result})`
      this.hexadecimalText = this.hexify(this.rgbaText)
    },
    cancle () {
      this.$emit('update:show', false)
    },
    confirm () {
      this.$emit('getResultColor', [this.rgbaText, this.hexadecimalText])
      this.$emit('update:show', false)
    },
    hexify (color) {
      var values = color
        .replace(/rgba?\(/, '')
        .replace(/\)/, '')
        .replace(/[\s+]/g, '')
        .split(',')
      var a = parseFloat(values[3] || 1),
        r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
        g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
        b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255)
      return "#" +
        ("0" + r.toString(16)).slice(-2) +
        ("0" + g.toString(16)).slice(-2) +
        ("0" + b.toString(16)).slice(-2)
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
  padding: 6px;
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
