<template>
    <div class="person-info">
      <ict-titlebar>个人信息</ict-titlebar>
      <div class="user">
        <p class="username">{{name}}</p>
        <p class="level">{{levelName}}</p>
      </div>
      <group>
        <cell title="手机绑定" :value="viewPhone" v-touch:tap="bindPhone" is-link></cell>
      </group>
      <group class="update-pwd">
        <cell title="登录密码" value="修改" v-touch:tap="resetPassword" is-link></cell>
      </group>
      <x-button type="primary"  v-touch:tap="doLogout">退出当前账户</x-button>
    </div>
</template>

<style lang="less">
    .person-info{
      p{
        margin: 0;
        padding: 0;
      }
      .user{
        width: 93.6%;
        height: 3.354rem;
        background: #fff;
        margin-top: 1.1rem;
        padding-left: 1.2rem;
        font-size: 0.75rem;

        .username,.level{
          width: 17.55rem;
          line-height: 1rem;
        }
        .username{
          margin-top: 0.5rem ;
          padding-top: 0.5rem;
          color: #000;
        }
        .level{
          margin: 0.25rem 0 0.5rem 0;
          color: #898989;
        }
      }
      .weui_cells{
        margin-top: 0;
        padding: 0.15rem 0.15rem;
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
import IctTitlebar from '../../components/IctTitlebar.vue'
import Cell from 'vux/cell'
import Group from 'vux/group'
import XButton from 'vux/x-button'
import {userActions, courseRecordActions} from '../../vuex/actions'
import {userGetters} from '../../vuex/getters'

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
      logout: userActions.logout,
      resetRecords: courseRecordActions.resetRecords
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
      this.logout()
      this.resetRecords()
      this.$route.router.go('/setting')
    },
    resetPassword: function () {
      this.$route.router.go('/reset/password/start')
    },
    bindPhone: function () {
      this.$route.router.go('/bind/phone')
    }
  }
}
</script>
