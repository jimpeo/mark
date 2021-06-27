<template>
  <div class="svg_icon">
    <svg class="svg_use" xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 1024 1024"
      :aria-labelledby="iconName" role="presentation" @click="handleClick">
      <g :fill="iconColor">
        <use :href="`#${iconName}`"></use>
      </g>
    </svg>
    <div class="svg_aggregate" ref="svgAggregate">
      <svg xmlns="http://www.w3.org/2000/svg">
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
        <symbol id="icon-reset">
          <path
            d="M402.304323 949.068163a34.00566 34.00566 0 0 1-9.506958-1.279783 447.741187 447.741187 0 0 1 0-864.401932 36.565226 36.565226 0 1 1 18.282613 70.570886 374.610736 374.610736 0 0 0 0 723.260161 36.565226 36.565226 0 0 1-8.775655 71.850668z">
          </path>
          <path
            d="M424.609111 260.910618a36.565226 36.565226 0 0 1-33.640008-51.008489l41.867184-97.811979-97.994805-41.867183A36.565226 36.565226 0 0 1 363.545184 2.942952l131.634812 56.127621a36.565226 36.565226 0 0 1 19.562396 20.110874 36.565226 36.565226 0 0 1 0 27.972398l-56.127621 131.451986a36.565226 36.565226 0 0 1-34.00566 22.304787zM611.274587 935.173377a36.565226 36.565226 0 0 1-7.861523-72.033494 374.610736 374.610736 0 0 0 20.110874-723.077335 36.565226 36.565226 0 0 1 21.025005-70.022407A447.741187 447.741187 0 0 1 619.867415 934.259247a45.706532 45.706532 0 0 1-8.592828 0.91413z">
          </path>
          <path
            d="M678.737428 1023.844049a36.565226 36.565226 0 0 1-18.282612-5.484784l-121.762201-74.958712a36.565226 36.565226 0 0 1-16.454352-22.67044 36.565226 36.565226 0 0 1 4.387827-27.606745l74.958713-121.762201a36.565226 36.565226 0 1 1 62.343709 38.210661l-54.847838 91.413063 91.413064 54.847839A36.565226 36.565226 0 0 1 678.737428 1023.844049z">
          </path>
        </symbol>
        <symbol id="icon-rubber">
          <path
            d="M554.3 850.7L981 424c12.5-12.5 12.5-32.8 0-45.3L636.7 34.6c-12.5-12.5-32.8-12.5-45.3 0L90.5 535.5c-50 50-50 131 0 181l272.1 270.3c24 23.8 56.4 37.2 90.2 37.2H864c17.7 0 32-14.3 32-32s-14.3-32-32-32H599.5c-57 0-85.6-68.9-45.2-109.3z m71.1-736.9l276.4 276.4c6.2 6.2 6.2 16.4 0 22.6L607.9 706.6l-299-299 293.8-293.9c6.3-6.2 16.4-6.2 22.7 0.1zM135.8 580.7l127.9-127.9 299 299-127.9 127.9c-25 25-65.5 25-90.5 0L135.8 671.3c-25-25-25-65.6 0-90.6z">
          </path>
        </symbol>
      </svg>
    </div>
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
  data () {
    return {
      flag: false
    }
  },
  mounted () {
    this.removeNode()
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    },
    removeNode () {
      const childNodes = Object.values(document.body.childNodes)
      for (let value of childNodes) {
        if (value.className === this.$refs.svgAggregate.className) {
          return this.flag = true
        }
      }
      if (this.flag) {
        if (this.$refs.svgAggregate.parentNode.nodeName === 'DIV') {
          this.$refs.svgAggregate.parentNode.removeChild(this.$refs.svgAggregate)
        }
      } else {
        document.body.appendChild(this.$refs.svgAggregate)
        if (this.$refs.svgAggregate.parentNode.nodeName === 'DIV') {
          this.$refs.svgAggregate.parentNode.removeChild(this.$refs.svgAggregate)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.svg_icon {
  float: left;
  .svg_use {
    vertical-align: top;
    cursor: pointer;
    user-select: none;
  }
  .svg_aggregate {
    display: none;
  }
}
</style>