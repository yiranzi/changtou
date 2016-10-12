<template>
  <div class="feedback">
    <ict-titlebar :right-options="rightOptions">
      意见反馈
      <a slot="right" v-touch:tap="isShow">提交</a>
    </ict-titlebar>
    <textarea  v-model="content" autocapitalize="off" placeholder="使用过程中遇到什么问题，请在此详细描述你的问题或建议，我们将及时跟进解决。"></textarea>
    <input type="text" placeholder="手机号或者邮箱地址（方便我们联系你）"/>
    <toast :show.sync="show" type="text" width="14rem" :time="3000">感谢你对长投学堂的支持!</toast >
  </div>

</template>
<style lang="less">
  .feedback{
    width: 100%;
    height: 100%;
    background-color: #fff;
    color: #898989;

    .right_able{
      disabled: true;
      color: #bbb;
    }
    .right_unable{
      disabled: false;
      color: #fff;
    }

    textarea{
      width: 16.75rem;
      height: 7.8rem;
      padding: 0;
      border: 0;
      margin: 1.5rem 1rem;
      font-family: '微软雅黑' !important;
      font-size: 0.65rem;
      display: block;
    }

    input{
      width: 100%;
      line-height: 2.25rem;
      background-color: #EEEFF1;
      padding: 0 1rem;
      border: 0;
      font-family: '微软雅黑' !important;
      font-size: 0.65rem;
    }
  }
</style>
<script>
  import IctTitlebar from '../../components/IctTitlebar.vue'
  import Toast from 'vux/toast'
  import {mineActions, globalActions} from '../../vuex/actions'
  export default {
    vuex: {
      actions: {
        updateContent: mineActions.updateContent,
        showAlert: globalActions.showAlert
      }
    },

    data () {
      return {
        rightOptions: {
          disabled: true,
          callback: this.doSave
        },
        content: '',
        show: false
      }
    },

    methods: {
      //点击提交按钮
      doSave () {
        const me = this
        this.upLoadContent(this.content).then(
          function (rep) {
            me.content = ''
            me.$route.router.go('/setting')
          },
          function () {
            me.showAlert('暂停失败,请重试')
          }
        )
      },
      isShow () {
        this.show = true
        return this.show
      }
    },

    watch: {
      'content': function (newVal, oldVal) {
        this.rightOptions.disabled = !newVal
      },
      'show': function (newShow) {
        this.show = newShow
      }
    },

    components: {
      IctTitlebar,
      Toast
    }
  }
</script>
