/**
 * Created by jun on 2016/10/19.
 *
 */
<template>
    <div class="pay-success">
      <ict-titlebar :left-options="{showBack: false}">成功提示</ict-titlebar>
      <div class="tip">
        <img src="/static/image/pay/success-icon.png">
        <p>恭喜您</p>
        <p>{{message.name}}购买成功</p>
      </div>
      <div class="message">
        <p class="message-title">{{message.title}}</p>
        <p class="message-content" v-for="item in message.content">{{{item}}}</p>
      </div>
      <div v-if="isBtnShow">
        <ict-button type="default" v-touch:tap="onConfirm">{{{message.btnText}}}</ict-button>
      </div>
    </div>
</template>
<script>
import IctTitlebar from '../../components/IctTitlebar.vue'
import IctButton from '../../components/IctButton.vue'
import { goodsType } from '../../util/pay/dealHelper'
  const messages = {
    'S': {
      name: '课程',
      title: '听课说明：',
      content: [
        `1.本课程有效期为<span>30</span>天；`,
        `2.购买成功后需要在课程详情页手动激活课程；`,
        `3.激活后，课程将开启<span>30</span>天倒计时；`,
        `4.可根据自身实际情况灵活安排课程激活、学习时间。`
      ],
      btnText: '去听课'
    },
    'ST': {
      name: '专题',
      title: '小提示：',
      content: [
        `本次购买套餐课程仅属于各自对应的有效期，请认真查看课程有效时间范围，合理安排学习时间。`
      ],
      btnText: '参看课程'
    },
    'CT': {
      name: '专题',
      title: '小提示：',
      content: [
        `本次购买套餐课程仅属于各自对应的有效期，请认真查看课程有效时间范围，合理安排学习时间。`
      ],
      btnText: '参看'
    }
  }

export default {
  data () {
    return {
      type: this.$route.params.type,
      id: this.$route.params.id,
      message: '',
      isBtnShow: true
    }
  },
  route: {
    data ({to: {params: { type }}}) {
      this.setMessage(type)
    }
  },
  methods: {
    setMessage (type) {
      this.message = messages[type]
    },
    onConfirm () {
      let path = this.type === goodsType.SUBJECT ? `/subject/detail/P/${this.id}/0` : '/mycourse'
      this.$route.router.replace(path)
    }
  },
  components: {
    IctTitlebar,
    IctButton
  }
}
</script>
<style lang="less">
  .pay-success{
    background: #f0eff5;
    .tip{
      width: 100%;
      height: 10rem;
      background: #fff;
      text-align: center;
      img{
        width: 2.5rem;
        height: 2.5rem;
        margin: 2.5rem 0 0.2rem;
      }
      p{
        margin: 0;
        font-size: 0.85rem;
        line-height: 1rem;
        color: #898989;
      }
    }
    .message{
      width: 100%;
      padding: 1.25rem;
      font-size: 0.7rem;
      line-height: 1rem;
      color: #898989;
      .title{
        line-height: 2.5rem;
      }
      .content{
        margin-bottom: 1rem;
      }
      span{
        color: #00b0f0;
      }
    }
    .ict-btn{
      position: absolute;
      bottom: 0;
      border-radius: 0;
    }
  }
</style>
