/**
 * Created by jun on 2017/3/1.
 * 填写内容页面
 */
<template>
    <div class="village-fill-content">
      <ict-titlebar :left-options="barLeftOption" :right-options="rightOptions" v-el:title-bar>
        <a slot="right">提交</a>我要吐槽
      </ict-titlebar>
      <textarea v-model="content" placeholder="不吐不快,话憋在心里会生病..." :style="textareaStyle" v-el:textarea></textarea>
    </div>
</template>
<script>
  import IctTitlebar from '../../components/IctTitleBar.vue'
  import {villageActions} from '../../vuex/actions'

export default {
  vuex: {
    actions: {
      submitAdvise: villageActions.submitAdvise
    }
  },
  data () {
    return {
      barLeftOption: { //titlebar
        showBack: true,
        callback: this.onBack
      },
      rightOptions: { //titlebar
        callback: this.onSubmitTap,
        disabled: true
      },
      content: '' //用户填写的信息
    }
  },
  computed: {
    /**
     * 输入框样式
     */
    textareaStyle () {
      return `width: 100%; height: ${window.document.body.offsetHeight - this.$els.titleBar.offsetHeight}px;`
    }
  },
  watch: {
    content (val) {
      this.rightOptions.disabled = !(/\S/.test(val))
    }
  },
  route: {
    data () {
      setTimeout(() => {
        this.$els.textarea.focus()
        this.setViewBackHandler()
      }, 300)
    },
    deactivate () {
      this.content = ''
      this.resetViewBackHandler()
    }
  },
  methods: {
    /**
     * 设置物理键back
     */
    setViewBackHandler () {
      this.$parent.viewBackHandler = this.onBack
    },
    /*
     * 退出页面时解除物理键back绑定关系
     * */
    resetViewBackHandler () {
      this.$parent.viewBackHandler = null
    },
    /**
     * 点击提交
     */
    onSubmitTap () {
      const textarea = this.$els.textarea
      textarea.blur()
      setTimeout(() => {
        if (/\S/.test(this.content)) {
          this.submitAdvise({
          content: this.content
        }).then(
          window.history.back()
        )
        }
      }, 300)
    },
    /*
    * 点击返回按钮
    * */
    onBack () {
      const textarea = this.$els.textarea
      textarea.blur()
      setTimeout(() => {
        window.history.back()
      }, 300)
    }
  },
  components: {
    IctTitlebar
  }
}
</script>
<style lang="less">
  .village-fill-content{
    textarea{
      display: block;
      width: 100%;
      margin: 0;
      border: 0;
      padding: 0.5rem;
      box-sizing: border-box;
      outline: 0;
      font-family: '\5FAE\8F6F\96C5\9ED1' !important;
      font-size: 0.7rem;
      color: #000;
    }
  }
</style>
