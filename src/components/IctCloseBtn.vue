/**
 * Created by jun on 2017/1/4.
 *
 */
<template>
  <div class="top-close-btn" v-touch:tap="close" v-bind:style="{top: activeTop}"></div>
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
      close () {
        this.$emit('close')
      }
    }
  }
</script>

<style>
  .top-close-btn {
    position: absolute;
    height: 2rem;
    width: 2rem;
    /*top: 0.3rem;*/
    right: 0.5rem;
    z-index: 20;
  }
  .top-close-btn:before {
    position: absolute;
    line-height: 2rem;
    width: 2rem;
    font-family: 'myicon';
    content: '\e90d';
    font-size: 0.8rem;
    text-align: center;
    color: #aaa;
  }
</style>
