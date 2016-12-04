/**
 * Created by jun on 2016/10/20.
 *
 */
<template>
  <div class="pay-postpone">
    <label class="pay_postpone_cell" :class="{'pay_postpone_cell_disabled':postpone.disabled}" v-for="postpone in postponeList" for="postpone_{{$index}}">
      <img class="pay_postpone_cell_img" :src="getCellSrc(postpone.disabled)" >
      <div class="pay_postpone_cell_name">
        <p>{{postpone.name}}</p>
        <p>{{postpone.info}}</p>
      </div>
      <input class="cell_check" type="radio" value="{{$index}}" :checked="isChecked($index)" disabled="{{postpone.disabled}}" v-model="value" id="postpone_{{$index}}">
      <span class="cell_checked"></span>
    </label>
  </div>
</template>
<script>
export default {
  props: {
    postponeList: Array,
    value: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    value (newVal) {
      this.$dispatch('postponeChange', newVal)
    }
  },
  methods: {
    isChecked (index) {
      if (index === 0) {
        if (this.postponeList[0].disabled) {
          return false
        } else {
          return true
        }
      } else {
        if (this.postponeList[0].disabled) {
          return true
        } else {
          return false
        }
      }
    },
    getCellSrc (disabled) {
      let src
      if (disabled) {
        src = './static/image/pay/unavailable.png'
      } else {
        src = './static/image/pay/available.png'
      }
      return src
    }
  }
}
</script>
<style lang="less">
  .pay-postpone {
    background: #fff;
    .pay_postpone_cell {
      position: relative;
      display: block;
      padding: 0 0.9rem;
      height: 3rem;
      text-align: left;
      font-size: 0.8rem;
      color: #aaa;
      line-height: 3rem;
      border-bottom: 1px solid #ddd;
      &_img {
        width: 1.2rem;
        height: 1.5rem;
        vertical-align: middle;
        margin-right: 0.85rem;
      }
      &_name {
        display: inline-block;
        vertical-align: middle;
        p {
          margin: 0;
        }
        p:nth-child(1) {
          font-size: 0.8rem;
          line-height: 1rem;
          color: #666;
        }
        p:nth-child(2) {
          font-size: 0.6rem;
          line-height: 0.8rem;
          color: #007aff;
        }
      }
      &_disabled {
        background: #eee;
        .pay_postpone_cell_name {
          p:nth-child(1) {
            color: #ccc;
          }
          p:nth-child(2) {
            color: #ccc;
          }
        }
        .cell_checked{
          border: 0;
        }
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
      left: -1rem;
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
  }
</style>
