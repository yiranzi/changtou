<template>
  <div class="top-back-btn" v-touch:tap="back" v-bind:style="{top: activeTop}"></div>
</template>

<script>
  import {Device, platformMap} from '../plugin/device'
  export default{
    data () {
      return {
        activeTop: Device.platform === platformMap.IOS ? (0.1 * window.fontScale + 20) + 'px' : '0.3rem'
      }
    },

    methods: {
      back () {
        if (parseInt(window.sessionStorage.getItem('count')) <= 1) {
          this.$route.router.go('/main')
        } else {
          window.history.back()
        }
      }
    }
  }
</script>

<style>
  .top-back-btn {
    position: absolute;
    height: 2rem;
    width: 2rem;
    /*top: 0.3rem;*/
    left: 1rem;
    z-index: 20;
  }
  .top-back-btn:before {
    position: absolute;
    display: inline-block;
    font-family: 'myicon';
    content: '\e91b';
    font-size: 1.6rem !important;
    line-height: 2rem;
    width: 2rem;
    color: #999;
  }
</style>
