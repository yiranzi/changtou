/**
 * Created by jun on 2016/10/27.
 *
 */
<template>
  <div class="ict-actionsheet">
    <div class="ict_actionsheet_mask"
         :class="{'ict_actionsheet_fade_toggle': show}"
         :style="{display: show ? 'block' : 'none'}"
         v-touch:tap="show=false"></div>
    <div class="ict_actionsheet" :class="{'ict_actionsheet_toggle': show}">
      <slot></slot>
      <div class="pay_actionsheet_cell pay_actionsheet_confirm" v-touch:tap="onConfirmTap">{{{confirmText}}}</div>
    </div>
  </div>
</template>
<script>
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

  },
  components: {

  }
}
</script>
<style lang="less">
  .ict-actionsheet{
    .ict_actionsheet_mask {
      display: none;
      position: fixed;
      z-index: 1000;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0,0,0,.6);
    }

    .ict_actionsheet{
      position: fixed;
      left: 0;
      bottom: 0;
      -webkit-transform: translateY(100%);
      transform: translateY(100%);
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      z-index: 5000;
      width: 100%;
      height: 15rem;
      background-color: #fff;
      -webkit-transition: -webkit-transform .3s;
      transition: transform .3s;

      //actionSheet aniamtion
      &_toggle{
        transform: translate(0, 0);
      }

      &_title{
        position: relative;
        height: 2.5rem;
        font-size: 0.85rem;
        color: #000;
        line-height: 2.5rem;
        text-align: center;
        .close-icon{
          &:before{
            position: absolute;
            width: 2.6rem;
            left: 0;
            text-align: center;
            font-family: 'myicon';
            content: '\e90d';
            font-size: 0.8rem !important;
          }
        }
      }

      &_menu{
        background-color: #FFF;
      }

      &_cell {
        position: relative;
        display: block;
        padding: 0 0.9rem;
        height: 3rem;
        text-align: left;
        font-size: 0.8rem;
        color: #aaa;
        line-height: 3rem;
        &_img {
          width: 1.6rem;
          vertical-align: middle;
          margin-right: 1rem;
        }
      }

      .cell_checked {
        position: absolute;
        top: 1rem;
        right: 0.9rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        border: #ddd 1px solid;
        border-radius: 50%;
      }
      .cell_check{
        position: absolute;
        left: -999em;
        &:checked {
          & + .cell_checked {
            border: 0;
            &:before {
              position: absolute;
              display: block;
              width: 1rem;
              height: 1rem;
              line-height: 1rem;
              font-family: 'myicon';
              content: '\e90c';
              color: #00b0f0;
              font-size: 1rem !important;
            }
          }
        }
      }

      &_title:before, &_cell:before {
        content: " ";
        position: absolute;
        left: 0;
        bottom: -1px;
        width: 100%;
        height: 0;
        border-bottom: 1px solid #f0eff5;
      }

      &_confirm {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 2.45rem;
        padding: 0;
        text-align: center;
        line-height: 2.45rem;
        background: #00b0f0;
        color: #fff;
        &:after {
          border: 0;
        }
      }
    }
  }
</style>
