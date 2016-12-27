<template>
  <div class="vux-swiper-item"><slot></slot> </div>
</template>

<script>
export default {
  ready () {
    this.childrender()
  },
  beforeDestroy () {
    const $parent = this.$parent
    this.$nextTick(() => {
      $parent.rerender()
    })
  },
  methods: {
    childrender () {
      if (!this.$el) {
        return
      }
      this.$nextTick(() => {
        this.index = 0
        this.current = 0
        this.$parent.length = this.$parent.list.length || this.length
        this.$parent.destroy()
        this.$parent.render()
      })
    }
  }
}
</script>
