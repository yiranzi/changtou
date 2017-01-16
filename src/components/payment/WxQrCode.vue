/**
 * Created by jun on 2017/1/13.
 * 微信支付 二维码支付
 */
<template>
    <div class="weChat-code-panel">
      <div class="weChat-code-img" id="wechat-code-img" v-touch:pressup="onPressUp" v-el:code-img>{{qrCodeImg}}</div>
      <div class="weChat-code-tip"><span>长按</span>识别二维码<p>完成微信支付</p></div>
    </div>
</template>
<script>
import QRCode from '../../plugin/qrcode'
export default {
  props: {
    componentData: String
  },

  ready () {
    new QRCode(window.document.getElementById('wechat-code-img'), {
      text: this.componentData,
      width: this.$els.codeImg.offsetWidth,
      height: this.$els.codeImg.offsetHeight,
      colorDark: '#000',
      colorLight: '#fff',
      correctLevel: QRCode.CorrectLevel.H
    })
  },

  methods: {
    onPressUp () {
      this.$dispatch('qrCodePress')
    }
  }
}
</script>
<style lang="less">
  .weChat-code-panel{
    width: 10rem;
    height: 13rem;
    background: #fff;
    border: none;
    border-radius: 10px;
    padding: 0.75rem 0 0 0;
    box-sizing: border-box;
    text-align: center;

    .weChat-code-img{
      height: 8rem;
      width: 8rem;
      background: red;
      text-align: center;
      margin: 0 auto 0;
    }

    .weChat-code-tip{
      margin-top: 0.5rem;
      font-size: 0.7rem;
      color: #000;
      text-align: center;
      span{
        color: #00b0f0;
      }
    }
  }
</style>
