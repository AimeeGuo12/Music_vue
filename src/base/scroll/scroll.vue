<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
// better-scroll初始化相关
export default {
  props: {
    probeType: { // probeType: 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: { // 监听scroll
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    },
    pullup: { // 上拉
      type: Boolean,
      default: false
    },
    beforeScroll: { // better-scroll滚动开始时会派发这样的事件
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  mounted() { // 页面刷新完毕后执行betterscroll
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() { // 如果这时还没有数据那么return掉，不要报错
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, { // 创建一个scroll属性，生成scroll实例
        probeType: this.probeType,
        click: this.click
      })

      if (this.listenScroll) { //
        let me = this
        this.scroll.on('scroll', (pos) => { //监听位置
          me.$emit('scroll', pos)
        })
      }

      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) { // 此时快滚到底部
            this.$emit('scrollToEnd') // 到底部
          }
        })
      }

      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    //方法代理
    disable() { // 禁用  如果不加，scroll的高度会高于内容的高度。
      this.scroll && this.scroll.disable()
    },
    enable() { // 启用better-scroll 默认开启
      this.scroll && this.scroll.enable()
    },
    refresh() { // 强制scroll重新计算，当better-scroll中的元素发生变化时调用此方法
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data() {
      setTimeout(() => { // scroll 时 保证高度已经准备好
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
