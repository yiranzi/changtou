/**
 * Created by zhongyan on 2017/2/27.
 *
 */
<template>
    <div>
      <div v-touch:tap="a">
<!--
        <scroller :lock-y='true' v-ref:vscroller :scrollbar-x="false" style="height:8.5rem;width:100%;background-color: red">
<!--&ndash;&gt;-->
          <!--<swiper>-->
            <!--<swiper-item>-->
              <!--aaaaaadd-->
            <!--</swiper-item>-->
          <!--</swiper>-->

<!--
        </scroller>
-->
        <chapter-choice-item></chapter-choice-item>
      </div>
    </div>
</template>
<script>
//  import Swiper from 'vux/swiper'
//  import SwiperItem from 'vux/swiper-item'

  export default {
    vuex: {
      getters: {

      },
      actions: {

      }
    },
    data () {
      return {

      }
    },
    computed: {

    },
    watch: {

    },
    route: {

    },
    ready () {

    },
    methods: {
      a () {
        this.$dispatch('showStory')
      }
    },
    components: {
//      Swiper,
//      SwiperItem
    }
  }
</script>
<style lang="less">
</style>
