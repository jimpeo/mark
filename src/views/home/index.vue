<template>
  <div class="home">
    <div class="control">
      <div class="row">
        <aw-button-group class="flex" style="width: 33%">
          <aw-button size="mini">上传图片</aw-button>
          <aw-button size="mini">生成画布</aw-button>
          <aw-button size="mini">下载图片</aw-button>
        </aw-button-group>
        <aw-button-group style="width: 33%;margin-left: 0">
          <span class="label">生成图片格式</span>
          <aw-button v-for="item in imgType" :key="item.id" :id="item.category" :disabled="!item.disabled" size="mini"
                     @click="changeType($event)">{{item.typeName}}</aw-button>
        </aw-button-group>
        <div>
          <span class="label">连续点</span>
          <aw-button v-for="item in continuationType" :key="item.id" :id="item.category" :disabled="!item.disabled" size="mini"
                     @click="changeContinuity($event)">{{item.typeName}}</aw-button>
        </div>
      </div>
      <div class="row">
        <div style="width: 33%">
          <span class="label">画布尺寸</span>
          <aw-input size="mini"></aw-input>
          <aw-input size="mini"></aw-input>
        </div>
        <div style="width: 33%">
          <span class="label">图片尺寸</span>
          <aw-input size="mini"></aw-input>
          <aw-input size="mini"></aw-input>
        </div>
        <div>
          <span class="label">图片位置</span>
          <aw-input size="mini"></aw-input>
          <aw-input size="mini"></aw-input>
        </div>
      </div>
      <div class="row">
        <div style="width: 33%">
          <span class="label">圆点半径</span>
          <aw-input size="mini"></aw-input>
        </div>
        <div style="width: 33%">
          <span class="label">圆点填充颜色</span>
          <aw-input size="mini"></aw-input>
        </div>
        <div>
          <span class="label">圆点边框颜色</span>
          <aw-input size="mini"></aw-input>
        </div>
      </div>
    </div>
    <div style="display: flex; justify-content: space-around;">
      <div v-for="(item,index) in num" :key="index">
        <div>示意图：</div>
        <point :imgSrc="imgSrc" :imgType="imgTypeActive" @getGeneratedImg="getGeneratedImg($event, index)" />
        <div>标注后图像：</div>
        <img :src="src[index]" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import awButton from '@/components/AwUi/awButton'
import awButtonGroup from '@/components/AwUi/awButtonGroup'
import awInput from '@/components/AwUi/awInput'
import point from '@/components/Point'
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
        { id: 1, category: 'img', typeName: 'base64', disabled: false },
        { id: 2, category: 'img', typeName: 'blob', disabled: true }
      ],
      continuationType: [
        { id: 1, category: 'continuation', typeName: '是', disabled: false },
        { id: 2, category: 'continuation', typeName: '否', disabled: true }
      ],
      num: [1, 2, 3, 4, 5],
      imgSrc: require('@/assets/signal.jpg'),
      src: [],
      imgTypeActive: 'blob'
    }
  },
  created () {

  },
  methods: {
    changeType () {
      this.imgType.forEach(item => {
        item.disabled = !item.disabled
      })
    },
    changeContinuity () {
      this.continuationType.forEach(item => {
        item.disabled = !item.disabled
      })
    },
    getGeneratedImg (img, index = 0) {
      if (this.imgType == "base64") {
        this.$set(this.src, index, img)
      } else if (this.imgType == "blob") {
        this.$set(this.src, index, URL.createObjectURL(img))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.control {
  width: 55vw;
  margin: 50px auto 0;
  .row {
    display: flex;
    // justify-content: space-between;
    margin-bottom: 20px;
  }
  .flex {
    display: flex;
    // justify-content: space-between;
  }
  .label {
    display: inline-block;
    width: 100px;
    margin-right: 5px;
  }
  .aw_input {
    width: 100px;
  }
  .aw_button.is-disabled:hover {
    cursor: pointer;
  }
  .aw_button.is-disabled {
    color: black;
    border: 1px solid black;
  }
}
</style>