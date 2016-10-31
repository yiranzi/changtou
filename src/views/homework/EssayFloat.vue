/**
 * Created by jun on 2016/10/27.
 * 问答题 浮框
 */
<template>
    <ict-sheet title="课后作业" :show="show" :btn-text="btnText" @confirm="onConfirmTap" @close="onClose">
      <div class="essay-float">
        <div class="essay-content">{{{essayQuestion}}}</div>
        <div class="essay-explain">
          {{{explain}}}
        </div>
      </div>
    </ict-sheet>
</template>
<script>
  import IctSheet from '../../components/IctActionSheet.vue'
  import { essayGetters } from '../../vuex/getters'
  const tpl = {
    // 简单作业
    'S': {
      explain:
      `<p>作业说明：</p>
      <p>1. 本课作业提交后，即可进行下一课内容的学习；作业通过后，可开启下一课的作业</p>
      <p>2. 每30s自动保存一次作业，作业未提交之前可重复编辑</p>
      <p>3. 作业在提交后的48个小时内完成批改</p>`,
      btnText: '写作业'
    },
    // 复杂作业
    'C': {
      explain:
        `<p>该课作业为复杂的图表作业。
        为了您更好的完成作业，真实的反映你的学习水平，
        请前往长投网www.ichangtou.com，完成该课作业。</p>`,
      btnText: '知道了'
    }
  }
  export default {
    props: {
      show: Boolean
    },
    vuex: {
      getters: {
        essayType: essayGetters.essayType,
        essayQuestion: essayGetters.essayQuestion,
        essayLessonId: essayGetters.essayLessonId,
        articleId: essayGetters.articleId
      }
    },
    data () {
      return {
        btnText: ''
      }
    },
    computed: {
      btnText () {
        return this.essayType ? tpl[this.essayType].btnText : null
      },
      explain () {
        return this.essayType ? tpl[this.essayType].explain : null
      }
    },
    methods: {
      onClose () {
        this.$emit('close')
      },
      onConfirmTap () {
        this.show = false
        this.$emit('confirm')
        if (this.essayType === 'S') {
          this.$route.router.go('/essay/answer/' + (parseInt(this.articleId) ? this.articleId : 0))
        }
      }
    },
    components: {
      IctSheet
    }
  }
</script>
<style lang="less">
  .essay-float{
    .essay-content{
      padding: 1rem 0.9rem 0.85rem;
      font-size: 0.7rem;
      color: #444;
      p {
        margin: 0;
      }
    }
    .essay-explain{
      padding: 0.85rem 0.9rem 2.5rem;
      font-size: 0.65rem;
      color: #656565;
      margin-bottom: 2.2rem;
      p {
        margin: 0;
      }
    }
  }
</style>
