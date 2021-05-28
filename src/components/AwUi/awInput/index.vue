<template>
  <div class="aw_input" :class="[
    size ? 'aw_input_' + size : '',
    {
      'is-disabled': disabled
    }
    ]" @mouseenter="hovering = true" @mouseleave="hovering = false">
    <input autocomplete="off" class="aw_input_inner" :placeholder="placeholder" :disabled="disabled" :readonly="readonly" ref="input"
           @compositionstart="handleCompositionStart" @compositionupdate="handleCompositionUpdate" @compositionend="handleCompositionEnd"
           @input="handleInput" @focus="handleFocus" @blur="handleBlur" @change="handleChange" :aria-label="label">
  </div>
</template>
<script>
export default {
  name: 'awInput',
  // 是否继承父元素的特性
  inheritAttrs: false,
  props: {
    // 指定value
    value: [String, Number],
    // 输入框大小
    size: String,
    // 禁用
    disabled: Boolean,
    // 只读
    readonly: Boolean,
    // 对应lable
    label: String,
    // 提示语
    placeholder: {
      type: String,
      default: '请输入'
    }
  },
  data () {
    return {
      hovering: false,
      focused: false,
      isComposing: false,
      passwordVisible: false
    }
  },
  mounted () {
    this.setNativeInputValue()
  },
  computed: {
    nativeInputValue () {
      return this.value === null || this.value === undefined ? '' : String(this.value)
    }
  },

  watch: {
    // native input value is set explicitly
    // do not use v-model / :value in template
    // see: https://github.com/ElemeFE/element/issues/14521
    nativeInputValue () {
      this.setNativeInputValue()
    }
  },

  methods: {
    getInput () {
      return this.$refs.input
    },
    focus () {
      this.getInput().focus()
    },
    blur () {
      this.getInput().blur()
    },
    handleBlur (event) {
      this.focused = false
      this.$emit('blur', event)
    },
    setNativeInputValue () {
      const input = this.getInput()
      if (!input) return
      if (input.value === this.nativeInputValue) return
      input.value = this.nativeInputValue
    },
    handleFocus (event) {
      this.focused = true
      this.$emit('focus', event)
    },
    handleCompositionStart () {
      this.isComposing = true
    },
    isKorean (text) {
      const reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi
      return reg.test(text)
    },
    handleCompositionUpdate (event) {
      const text = event.target.value
      const lastCharacter = text[text.length - 1] || ''
      this.isComposing = !this.isKorean(lastCharacter)
    },
    handleCompositionEnd (event) {
      if (this.isComposing) {
        this.isComposing = false
        this.handleInput(event)
      }
    },
    handleInput (event) {
      // should not emit input during composition
      // see: https://github.com/ElemeFE/element/issues/10516
      if (this.isComposing) return

      // hack for https://github.com/ElemeFE/element/issues/8548
      // should remove the following line when we don't support IE
      if (event.target.value === this.nativeInputValue) return

      this.$emit('input', event.target.value)

      // ensure native input value is controlled
      // see: https://github.com/ElemeFE/element/issues/12850
      this.$nextTick(this.setNativeInputValue)
    },
    handleChange (event) {
      this.$emit('change', event.target.value)
    }
  }
}
</script>
<style lang="scss">
.aw_input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}
.aw_input_inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}

.aw_input_small {
  font-size: 13px;
  .aw_input_inner {
    height: 32px;
    line-height: 32px;
  }
}

.aw_input_medium {
  font-size: 14px;
  .aw_input_inner {
    height: 36px;
    line-height: 36px;
  }
}

.aw_input_mini {
  font-size: 12px;
  .aw_input_inner {
    height: 28px;
    line-height: 28px;
  }
}

.aw_input_inner::placeholder {
  color: #c0c4cc;
}

.aw_input_inner:hover {
  border-color: #c0c4cc;
}

.aw_input_inner:focus {
  border-color: #409eff;
  outline: 0;
}

.aw_input.is-disabled .aw_input_inner {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}
</style>