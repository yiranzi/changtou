<template>
    <div class="person-info">
      <ict-titlebar>我的信息</ict-titlebar>
      <div class="user">
        <img class="ict-user-avatar" src="http://www.ichangtou.com/images/per-tx.png">
        <p class="username">{{name}}</p>
        <p class="level">{{levelName}}</p>
        <div class="changeNickName" v-touch:tap="gotoResetName">
          更改昵称
        </div>
      </div>
      <group class="phoneBind">
        <cell title="手机绑定" :value="viewPhone" v-touch:tap="bindPhone" is-link></cell>
      </group>
      <group class="update-pwd">
        <cell title="登录密码" value="修改" v-touch:tap="resetPassword" is-link></cell>
      </group>
      <x-button type="primary"  v-touch:tap="doLogout">退出登录</x-button>
    </div>
</template>

<style lang="less">
    .person-info{
      .phoneBind {
        margin-top: .5rem;
      }
      p{
        margin: 0;
        padding: 0;
      }
      .user{
        width: 93.6%;
        height: 3.354rem;
        background: #fff;
        margin-top: .6rem;
        padding-left: 1.2rem;
        font-size: 0.75rem;
        .ict-user-avatar{
          width: 2.8rem;
          height: 2.8rem;
          border-radius: 50%;
          margin-top: .3rem;
          float: left;
          margin-right: .54rem;
        }
        .username,.level{
          display: inline-block;

        }
        .username{
          color: #000;
          width: 70%;
          margin: .5rem 0;
        }
        .level{
          color: #898989;
        }
      }
      .changeNickName{
        height: 1rem;
        color: #888;
        display: inline-block;
        margin-left: 6.4rem;
        position: relative;
        top: -.8rem;
      }
      .changeNickName:after{
        content: " ";
        display: inline-block;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        height: 6px;
        width: 6px;
        border-width: 2px 2px 0 0;
        border-color: #C8C8CD;
        border-style: solid;
        position: relative;
        top: -1px;
        margin-left: .3em;
      }
      .weui_cells{
        margin-top: 0;
        font-size: 0.7rem;
      }
      .update-pwd{
        margin: 1.25rem 0;
      }
      .weui_btn_primary{
        background-color: #fff;
      }
      .weui_btn{
        color: #000;
        font-family: '微软雅黑';
        font-size: 0.75rem;
        padding: 0.3rem 0;
      }
    }
</style>
<script>
import IctTitlebar from '../../components/IctTitleBar.vue'
import Cell from 'vux/cell'
import Group from 'vux/group'
import XButton from 'vux/x-button'
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
      userPhone: userGetters.phone
    },
    actions: {
      logout: userActions.logout
//      resetRecords: courseRecordActions.resetRecords
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
    Cell,
    Group,
    XButton
  },
  methods: {
    doLogout: function () {
      this.showConfirm({
          title: '确定退出当前账号',
          message: '',
          okText: '确定',
          cancelText: '取消',
          okCallback: okHandler.bind(this)
        })
        function okHandler () {
          this.logout()
//          this.resetRecords()
          this.$dispatch(eventMap.LOGOUT)
          window.history.back()
        }
    },
    resetPassword: function () {
      this.$route.router.go('/reset/password/start')
    },
    bindPhone: function () {
      this.$route.router.go('/bind/phone')
    },
    gotoResetName: function () {
      this.$route.router.go('/resetNickName')
    }
  }
}
</script>
