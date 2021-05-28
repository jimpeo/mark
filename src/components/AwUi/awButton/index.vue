<template>
  <button class="aw_button" :disabled="disabled || loading" :type="nativeType" @click="handleClick" :class="[
      type ? 'aw_button_' + type : '',
      size ? 'aw_button_' + size : '',
      {   
        'is-disabled': disabled,
        'is-loading': loading,
        'is-round': round
      }
    ]">
    <svg t="1622014217552" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4247" width="15"
         height="15" v-if="loading">
      <path d="M533.712538 101.851631c13.248955-7.183654 30.638839-1.148579 38.658739 13.420235l73.095947 132.862338c8.060201 14.558738 3.737918 32.351632-9.511037 39.535285s-30.648914 1.148579-38.658739-13.420234l-73.106023-132.862338c-8.009825-14.558738-3.727843-32.351632 9.521113-39.535286z"
            fill="#fff" p-id="4248"></path>
      <path d="M700.347117 10.388501c-8.956898-12.090301-27.26363-13.883696-40.673789-4.030101L536.815715 96.350544c-13.410159 9.82337-17.047325 27.727091-8.060201 39.787167s27.273705 13.883696 40.683864 4.030101L692.266766 50.175668c13.410159-9.82337 17.047325-27.727091 8.080351-39.787167zM485.804718 922.148359c-13.248955 7.183654-30.648914 1.148579-38.658739-13.420235l-73.106022-132.862338c-8.009825-14.558738-3.727843-32.351632 9.521112-39.535285s30.648914-1.148579 38.658739 13.420234l73.106023 132.862338c8.009825 14.558738 3.727843 32.351632-9.521113 39.535286z"
            fill="#fff" p-id="4249"></path>
      <path d="M319.160063 1013.611489c8.966974 12.090301 27.273705 13.883696 40.683865 4.030101l122.857613-89.982069c13.410159-9.82337 17.047325-27.727091 8.060201-39.787167s-27.273705-13.883696-40.683865-4.0301L327.25049 973.824322c-13.410159 9.82337-17.017099 27.727091-8.090427 39.787167z"
            fill="#fff" p-id="4250"></path>
      <path d="M462.470436 928.485692a32.381857 32.381857 0 0 1-4.0301-0.251882A424.168076 424.168076 0 0 1 195.063194 790.112192a418.878569 418.878569 0 0 1-39.404307-507.520629 423.744915 423.744915 0 0 1 174.825759-152.488927 32.240804 32.240804 0 0 1 27.49536 58.325629 359.333834 359.333834 0 0 0-148.247246 129.305774 354.366735 354.366735 0 0 0 33.389382 429.387056A359.756995 359.756995 0 0 0 466.399784 864.255965a32.240804 32.240804 0 0 1-3.969649 64.229727zM660.852133 902.511694a32.240804 32.240804 0 0 1-12.191054-62.103848 358.678943 358.678943 0 0 0 160.408074-129.164721 354.376811 354.376811 0 0 0-31.29373-440.590735 359.36406 359.36406 0 0 0-229.927308-114.777262 32.243826 32.243826 0 0 1 6.297032-64.17935 423.785216 423.785216 0 0 1 271.135085 135.371075 418.868494 418.868494 0 0 1 36.915721 520.719208A423.029572 423.029572 0 0 1 673.033111 900.103709a32.109826 32.109826 0 0 1-12.180978 2.407985z"
            fill="#fff" p-id="4251"></path>
    </svg>
    <span :class="{'text': loading}">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'awButton',
  props: {
    // 按钮类型
    type: String,
    // 按钮大小
    size: String,
    // 加载效果
    loading: Boolean,
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 圆角按钮
    round: {
      type: Boolean,
      default: false
    },
    // 原生属性-按钮类型
    nativeType: {
      type: String,
      default: 'button'
    }
  },
  data () {
    return {

    }
  },
  created () {

  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>

<style lang="scss">
@keyframes rotating {
  0% {
    transform: translateY(-50%) rotateZ(0deg);
  }
  100% {
    transform: translateY(-50%) rotateZ(360deg);
  }
}

// default
.aw_button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  svg {
    position: absolute;
    top: 50%;
    left: 15px;
    animation: rotating 2s linear infinite;
  }
}
.aw_button:focus,
.aw_button:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
.aw_button:active {
  color: #3a8ee6;
  border-color: #3a8ee6;
  outline: none;
}
.aw_button.is-disabled,
.aw_button.is-disabled:focus,
.aw_button.is-disabled:hover {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
}

// 按钮间距
.aw_button + .aw_button {
  margin-left: 10px;
}

// primary样式
.aw_button_primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.aw_button_primary:focus,
.aw_button_primary:hover {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}
.aw_button_primary:active {
  background: #3a8ee6;
  border-color: #3a8ee6;
  color: #fff;
}
.aw_button_primary.is-disabled,
.aw_button_primary.is-disabled:active,
.aw_button_primary.is-disabled:focus,
.aw_button_primary.is-disabled:hover {
  color: #fff;
  background-color: #a0cfff;
  border-color: #a0cfff;
}

// success样式
.aw_button_success {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
}
.aw_button_success:focus,
.aw_button_success:hover {
  background: #85ce61;
  border-color: #85ce61;
  color: #fff;
}
.aw_button_success:active {
  background: #5daf34;
  border-color: #5daf34;
  color: #fff;
}
.aw_button_success.is-disabled,
.aw_button_success.is-disabled:active,
.aw_button_success.is-disabled:focus,
.aw_button_success.is-disabled:hover {
  color: #fff;
  background-color: #b3e19d;
  border-color: #b3e19d;
}

// info样式
.aw_button_info {
  color: #fff;
  background-color: #909399;
  border-color: #909399;
}
.aw_button_info:focus,
.aw_button_info:hover {
  background: #a6a9ad;
  border-color: #a6a9ad;
  color: #fff;
}
.aw_button_info:active {
  background: #82848a;
  border-color: #82848a;
  color: #fff;
}
.aw_button_info.is-disabled,
.aw_button_info.is-disabled:active,
.aw_button_info.is-disabled:focus,
.aw_button_info.is-disabled:hover {
  color: #fff;
  background-color: #c8c9cc;
  border-color: #c8c9cc;
}

// warning样式
.aw_button_warning {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
}
.aw_button_warning:focus,
.aw_button_warning:hover {
  background: #ebb563;
  border-color: #ebb563;
  color: #fff;
}
.aw_button_warning:active {
  background: #cf9236;
  border-color: #cf9236;
  color: #fff;
}
.aw_button_warning.is-disabled,
.aw_button_warning.is-disabled:active,
.aw_button_warning.is-disabled:focus,
.aw_button_warning.is-disabled:hover {
  color: #fff;
  background-color: #f3d19e;
  border-color: #f3d19e;
}

// danger样式
.aw_button_danger {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}
.aw_button_danger:focus,
.aw_button_danger:hover {
  background: #f78989;
  border-color: #f78989;
  color: #fff;
}
.aw_button_danger:active {
  background: #dd6161;
  border-color: #dd6161;
  color: #fff;
}
.aw_button_danger.is-disabled,
.aw_button_danger.is-disabled:active,
.aw_button_danger.is-disabled:focus,
.aw_button_danger.is-disabled:hover {
  color: #fff;
  background-color: #fab6b6;
  border-color: #fab6b6;
}

// 文字按钮
.aw_button_text {
  border-color: transparent;
  color: #409eff;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
}
.aw_button_text:focus,
.aw_button_text:hover {
  color: #66b1ff;
  border-color: transparent;
  background-color: transparent;
}
.aw_button_text:active {
  color: #3a8ee6;
  background-color: transparent;
}
.aw_button_text.is-disabled,
.aw_button_text.is-disabled:focus,
.aw_button_text.is-disabled:hover,
.aw_button_text:active {
  border-color: transparent;
}

// 按钮尺寸样式
.aw_button_medium {
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.aw_button_small {
  padding: 9px 15px;
  font-size: 12px;
  border-radius: 3px;
}
.aw_button_mini {
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 3px;
}

// 按钮圆角
.is-round {
  border-radius: 20px;
}

// 加载
.is-loading {
  position: relative;
  pointer-events: none;
}
.is-loading::before {
  pointer-events: none;
  content: "";
  position: absolute;
  left: -1px;
  top: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: inherit;
  background-color: hsla(0, 0%, 100%, 0.35);
}
.text {
  margin-left: 15px;
}
</style>
