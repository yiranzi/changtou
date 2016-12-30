<template>
  <div class="principal-base bind-phone">
    <ict-titlebar @back="onTitlebarBack">{{userPhone ? '修改手机号' : '绑定手机号'}}</ict-titlebar>
    <div style="height: 1.5rem" :class="{'err-tip': errTip,'no-err': !errTip}">
      {{errTip}}
    </div>

    <ict-input title="手机号"
             type="tel"
             placeholder="请输入新手机号"
             id="bind-phone-phone"
             :value.sync="phone">
    </ict-input>

    <div style="height: 3rem" class="spacer"></div>
    <div class="btn-box">
      <ict-button type="default"
                  :disabled="isDisabled"
                  v-touch:tap="sendPhone"
                  text="下一步">
      </ict-button>
    </div>
  </div>
</template>
<style>
</style>
<script>
  import IctTitlebar from '../../../components/IctTitleBar.vue'
  import IctButton from '../../../components/IctButton.vue'
  import IctInput from '../../../components/form/IctInput.vue'
  import {userGetters} from '../../../vuex/getters'
  import {userActions} from '../../../vuex/actions'
  import {eventMap} from '../../../frame/eventConfig'
  import {statisticsMap} from '../../../statistics/statisticsMap'
  export default {
    vuex: {
      getters: {
        userPhone: userGetters.phone
      },
      actions: {
        bindPhone: userActions.bindPhone
      }
    },
    data () {
      return {
        errTip: '',
        phone: ''
      }
    },
    computed: {
      isDisabled () {
        return !(/^1[3|4|5|7|8]\d{9}$/.test(this.phone))
      }
    },
    watch: {
      phone () {
        this.errTip = ''
      }
    },
    events: {
      'ictInputFocus' (id) {
        if (id === 'bind-phone-phone') {
          this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.BIND_PHONE_INPUT_PHONE, {})
        }
      }
    },
    methods: {
      /**
       * 点击下一步
       */
      sendPhone () {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.BIND_PHONE_TAP_NEXT, {})
        this.bindPhone(this.phone).then(
          () => this.$route.router.go('/bind/phone/end/' + this.phone)
        ).catch(
          err => {
           console.dir('err')
           this.errTip = err.message
          }
        )
      },

      onTitlebarBack () {
        this.$dispatch(eventMap.STATISTIC_EVENT, statisticsMap.BIND_PHONE_PHONE_BACK, {})
      }
    },
    components: {
      IctTitlebar,
      IctInput,
      IctButton
    }
  }
</script>
<style lang="less">
.bind-phone{

}
</style>
