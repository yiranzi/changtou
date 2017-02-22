<template>
    <div class="person-info">
      <ict-titlebar>我的信息</ict-titlebar>
      <div class="user">
        <img class="ict-user-avatar" :src="avatar">
        <div class="user-box">
          <p class="username">{{name}}</p>
          <p class="level">{{levelName}}</p>
        </div>
        <div class="changeNickName" v-touch:tap="gotoResetName">
          更改昵称
        </div>
      </div>
      <ict-item title="手机绑定"
                class="bind-phone"
                :value="viewPhone"
                link="/bind/phone">
      </ict-item>
      <ict-item title="登录密码"
                :disabled="!userPhone"
                class="reset-password"
                :disabled="!!!userPhone"
                value="修改"
                link="/reset/password/start">
      </ict-item>
      <ict-button v-touch:tap="doLogout">退出登录</ict-button>
    </div>
</template>
<style lang="less">
    .person-info{
      p{
        margin: 0;
        padding: 0;
      }
      .user{
        width: 100%;
        height: 3.354rem;
        background: #fff;
        margin-top: 1rem;
        padding: 0 1rem;
        box-sizing: border-box;
        font-size: 0.75rem;
        .ict-user-avatar{
          width: 2.8rem;
          height: 2.8rem;
          border-radius: 50%;
          margin-top: .3rem;
          float: left;
          margin-right: .54rem;
          vertical-align: top;
        }
        .user-box,.username,.level{
          display: inline-block;
        }
        .user-box{
          vertical-align: top;
          .username{
            color: #000;
            width: 70%;
            margin: .5rem 0;
            font-size: 0.7rem;
          }
          .level{
            color: #898989;
            font-size: 0.6rem;
          }
        }
      }
      .changeNickName{
        color: #888;
        display: inline-block;
        padding-right: 1.5rem;
        text-align: right;
        font-size: 0.6rem;
        line-height: 3.354rem;
        vertical-align: top;
        position: absolute;
        right: 1rem;
      }
      .changeNickName:after{
        content: " ";
        display: inline-block;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        height: 12px;
        width: 12px;
        border-width: 1px 1px 0 0;
        border-color: #898989;
        border-style: solid;
        position: absolute;
        top: 1.35rem;
        margin-left: .3em;
      }
      .ict-btn{
        background: #fff;
        color: #000;
        border-radius: 0;
      }
      .bind-phone{
        border-top: #f0eff5 1px solid;
      }
      .reset-password{
        margin: 1rem 0;
      }
    }
</style>
<script>
import IctItem from '../../components/IctItemButton.vue'
import IctTitlebar from '../../components/IctTitleBar.vue'
import IctButton from '../../components/IctButton.vue'
import {userActions} from '../../vuex/actions'
import {userGetters} from '../../vuex/getters'
import {eventMap} from '../../frame/eventConfig'

//修改成一个（json）文件
const userLevel = {
    A: '管理员',
    D: '数据员',
    E: '普通用户',
    F: '分析师',
    M: '长投圈营销',
    P: '长投圈付费用户',
    Q: '长投圈用户',
    Z: '助教'
}
export default {
  vuex: {
    getters: {
      name: userGetters.userName,
      level: userGetters.level,
      avatar: userGetters.avatar,
      userPhone: userGetters.phone
    },
    actions: {
      logout: userActions.logout
    }
  },
  computed: {
    levelName () {
      return userLevel[this.level]
    },
    //处理获得的手机号
    viewPhone () {
      return this.userPhone ? this.userPhone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') : '未绑定'
    }
  },
  components: {
    IctTitlebar,
    IctItem,
    IctButton
  },
  methods: {
    doLogout: function () {
      this.showConfirm({
          title: '',
          message: '确定退出当前账号',
          okText: '确定',
          cancelText: '取消',
          okCallback: okHandler.bind(this)
        })
        function okHandler () {
          this.logout()
          this.$dispatch(eventMap.LOGOUT)
          window.history.back()
        }
    },
    gotoResetName: function () {
      this.$route.router.go('/resetNickName')
    }
  }
}
</script>
