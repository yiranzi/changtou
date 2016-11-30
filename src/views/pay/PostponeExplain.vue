/**
 * Created by jun on 2016/11/30.
 * 延期说明
 */
<template>
  <div class="postpone-explain">
    <ict-titlebar >延期说明</ict-titlebar>
    <div class="explain-content">
      <p>1、什么是延期？</p>
      <p class="content-last-line">长投学堂的课程学习时间一般定制为30天，若想延长学习时间可使用延期功能，延长功能在30天有效时间结束之后也可使用；</p>
      <p>2、延期有几种类型？</p>
      <p class="content-last-line">目前延期为两挡，分别是延长90天、延长30天；</p>
      <p>3、具体怎么操作</p>
      <p>延长90天选项只可使用1次；</p>
      <p class="content-last-line">延长30天选项可无限次使用。</p>
    </div>
  </div>
</template>
<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
export default {
  components: {
    IctTitlebar
  }
}
</script>
<style lang="less">
  .postpone-explain{
    p{
      margin: 0;
    }
    .explain-content{
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      background: #f0eff5;
      padding: 1rem 1.25rem;
      font-size: 0.7rem;
      color: #898989;
      .content-last-line{
        margin-bottom: 1rem;
      }
    }
  }
</style>
