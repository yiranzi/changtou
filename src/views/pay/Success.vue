/**
 * Created by jun on 2016/10/19.
 *
 */
<template>
    <div class="pay-success">
      <ict-titlebar :left-options="{showBack: false}" :right-options="rightOptions">成功提示
        <a slot="right" v-if="isCT">完成</a>
      </ict-titlebar>
      <div class="tip">
        <img src="../../assets/styles/image/pay/success-icon.png">
        <p>恭喜您</p>
        <p>{{message.name}}购买成功</p>
      </div>
      <div class="message">
        <p class="message-title">{{message.title}}</p>
        <p class="message-content" v-for="item in message.content">{{{item}}}</p>
      </div>
      <ict-button type="default" v-touch:tap="onConfirm" v-if="!isCT">{{{message.btnText}}}</ict-button>
    </div>
</template>
<script>
import IctTitlebar from '../../components/IctTitleBar.vue'
import IctButton from '../../components/IctButton.vue'
import {getLocalCache, clearLocalCache} from '../../util/cache'
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
      btnText: '查看课程'
    },
    'CT': {
      name: '',
      title: '',
      content: [],
      btnText: '完成'
    },
    'VS': {
      name: '策略',
      title: '说明：',
      content: [
        `1. 长投宝VIP版{period}期服务是专为长投用户提供的咨询服务，有效期{period}。`,
        `2. 超过有效期后，长投宝VIP版将无法继续使用，需要再次购买；`,
        `3. 底栏点击“我的”，进入指数宝VIP版栏目，即可随时查看最新资讯。`
      ],
      btnText: '立即查看'
    },
    'PS': {
      name: '策略',
      title: '说明：',
      content: [
        `1. 长投宝专业版{period}期服务是专为长投用户提供的咨询服务，有效期{period}。`,
        `2. 超过有效期后，长投宝专业版将无法继续使用，需要再次购买；`,
        `3. 底栏点击“我的”，进入指数宝专业版栏目，即可随时查看最新资讯。`
      ],
      btnText: '立即查看'
    }
  }
export default {
  data () {
    return {
      type: '',
      id: 0,
      message: ''
    }
  },

  computed: {
    isCT () {
      return this.type === 'CT'
    },
    // titlebar
    rightOptions () {
      if (this.type === 'CT') {
        return {
          callback: this.onConfirm,
          disabled: false
        }
      }
    }
  },

  route: {
    data ({to: {params: { type, id }}}) {
      this.type = type
      this.id = id
      this.setMessage(type)
    }
  },
  methods: {
    setMessage (type) {
      let message = messages[type]
      let period = getLocalCache('strategy-period') && getLocalCache('strategy-period').period
      clearLocalCache('strategy-period')
      if (type === 'VS' || type === 'PS') {
        message.content = message.content.map(
          (item) => item.replace(/{period}/g, period)
        )
      }
      this.message = messages[type]
    },
    // 点击按钮
    onConfirm () {
      window.history.go(-1)
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
    width: 100%;
    height: 100%;
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
