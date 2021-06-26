<template>
  <div class="svg_icon">
    <svg class="svg_use" xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 1024 1024"
         :aria-labelledby="iconName" role="presentation">
      <!-- <title :id="iconName" lang="en">{{iconName}} icon</title> -->
      <g :fill="iconColor">
        <use :href="`#${iconName}`" @click="handleClick"></use>
      </g>
    </svg>
    <svg class="svg_aggregate" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <symbol id="icon-next">
        <path
              d="M532.48 377.173333V227.555556a11.377778 11.377778 0 0 1 19.342222-7.964445l312.888889 284.444445a11.377778 11.377778 0 0 1 0 17.066666l-312.888889 284.444445a11.377778 11.377778 0 0 1-19.342222-7.964445v-139.946666a498.346667 498.346667 0 0 0-373.76 107.52 11.377778 11.377778 0 0 1-18.204444-11.377778c21.617778-95.573333 108.657778-376.604444 391.964444-376.604445z">
        </path>
      </symbol>
      <symbol id="icon-prev">
        <path
              d="M476.16 377.173333V227.555556A11.377778 11.377778 0 0 0 455.111111 216.746667l-312.888889 284.444444a11.377778 11.377778 0 0 0 0 17.066667l312.888889 284.444444a11.377778 11.377778 0 0 0 19.342222-7.964444v-137.102222a498.346667 498.346667 0 0 1 373.76 107.52 11.377778 11.377778 0 0 0 18.204445-11.377778c-19.911111-95.573333-106.951111-376.604444-390.257778-376.604445z">
        </path>
      </symbol>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'box'
    },
    width: {
      type: [Number, String],
      default: 25
    },
    height: {
      type: [Number, String],
      default: 25
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>

<style lang="less" scoped>
.svg_icon {
  display: inline-block;
  .svg_use {
    vertical-align: baseline;
    cursor: pointer;
    user-select: none;
    // &:hover {
    //   position: relative;
    //   top: 1px;
    //   left: 1px;
    // }
  }
  .svg_aggregate {
    display: none;
  }
}
</style>