/**
 * Created by jun on 2016/10/19.
 *
 */
<template>
  <div class="qr-code"  v-show="show">
    <div class="qr-code-mask" v-touch:tap="onCodePressed"></div>
    <div class="qr-code-content" id="qr-code-content" v-touch:pressup="onCodePressed"></div>
  </div>
</template>
<script>
  import QRCode from '../../plugin/qrcode'
export default {
  props: {
    show: Boolean,
    url: String
  },
  watch: {
    url (newUrl) {
      if (newUrl) {
        this.prepareCode()
      }
    }
  },
  methods: {
    /**
     * 长按二位码后
     */
    onCodePressed () {
      this.$emit('code-pressed')
    },
    /**
     * 准备二维码
     */
    prepareCode () {
      let content = document.getElementById('qr-code-content')
      if (content.childNodes.length > 0) {
        content.removeChild(content.childNodes[1])
        content.removeChild(content.childNodes[0])
      }
      this.paintCode({element: content, url: this.url})
    },
    /**
     * 渲染二维码
     */
    paintCode ({element, url}) {
      new QRCode(element, {
        text: url,
        width: 500 / 2,
        height: 500 / 2,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    }
  }
}
</script>
<style lang="less">
  .qr-code{
    position: absolute;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &-mask{
      position: relative;
      z-index: 1001;
      width: 100%;
      height: 100%;
      background: #000;
      opacity: 0.6;
    }
    &-content{
      position: absolute;
      z-index: 1002;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 270px;
      height: 270px;
      background: #fff;
      img{
        margin: 10px;
      }
    }
  }
</style>
