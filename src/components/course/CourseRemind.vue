<template>
  <div class="remind" :id="isRemindShow?'show':''">
    <div class="remind-closebtn" v-touch:tap="closeModal"></div>
    <div class="remind-title">设置上课提醒</div>
    <div class="remind-tip">最近一周</div>
    <div class="remind-img"><img src="../../assets/styles/image/courseDetail/setRemind.png"></div>
    <div class="remind-date">提醒时间<span class="remind-date-text">{{remindTimeStart.day}}</span>日~<span class="remind-date-text">{{remindTimeEnd.day}}</span>日</div>
    <div class="remind-timepicker"><picker :data='remindTimeList' :value.sync='remindTimeValue' @on-change='onSetTimeChange'></picker></div>
    <div class="remind-btn" v-touch:tap="setRemind">确定</div>
  </div>
  <div class="remind remind-cancel" :id="isRemoveRemindShow?'show':''">
    <div class="remind-closebtn" v-touch:tap="closeModal"></div>
    <div class="remind-title">上课提醒</div>
    <div class="remind-canceldate"><span class="remind-date-cancelText">取消</span>每日提醒<span class="remind-date-text">{{remindTimeStart.day}}</span>日~<span class="remind-date-text">{{remindTimeEnd.day}}</span>日&nbsp&nbsp<span class="remind-date-text">{{(remindTimeData[0] == 0 ? '0时' : remindTimeData[0])}}  {{(remindTimeData[1] == 0 ? '0分' : remindTimeData[1])}}</div>
    <div class="remind-cancelimg"><img src="../../assets/styles/image/courseDetail/noRemind.png"></div>
    <div class="remind-btn"><div class="remind-actionbtn-left" v-touch:tap="closeModal">继续提醒</div><div class="remind-actionbtn-right" v-touch:tap="removeRemind">不再提醒</div></div>
  </div>
  <div :class="isRemindShow || isRemoveRemindShow ? 'modalCover-show' : 'modalCover'" v-touch:tap='closeModal'></div>
  <div class="remind-checktip" v-show="isCheckTipShow">{{remindCheckTip}}</div>
</template>
<style lang="less">
  .modalCover,.modalCover-show{
    height:0;
    background-color: black;
    opacity: 0.7;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 30;
    width: 100%;
  }
  .modalCover-show{
    height:100%;
  }
  .remind-checktip{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 5/40rem;
    width: 6rem;
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: 1rem;
    background-color: rgba(0,0,0,0.8);
    color: #fff;
    padding: 1rem 0;
    text-align: center;
    z-index: 60;
    transition: all 0.5s;
  }
  .remind,.remind-cancel{
    display: block;
    position: fixed;
    width: 100%;
    bottom: 0;
    background:#fff;
    z-index:200;
    /*transition:all 0.2s;
    -webkit-transition:all 0.2s;*/
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  &-count-down{
     vertical-align: middle;
   }
  &-timepicker{
     padding-bottom: 98/40rem;
   }
  &-closebtn{
     position: absolute;
     right: 3/4rem;
     top:3/4rem;
     width: 3/4rem;
     height: 3/4rem;
   }
  &-closebtn:before{
     position: absolute;
     font-family: 'myicon';
     content: '\e90d';
     font-size: 3/4rem !important;
     line-height: 3/4rem;
     color: #999;
   }
  &-title{
     height: 2.5rem;
     line-height: 2.5rem;
     font-size: 0.8rem;
     color:#444;
     text-align: center;
     border-bottom: 1px solid #f0eff5;
     font-weight: bold;
   }
  &-tip{
     position: absolute;
     font-size: 0.7rem;
     color: #fff;
     background: #0099ff;
     width: 4.5rem;
     line-height: 1.5rem;
     height: 1.5rem;
     box-sizing: border-box;
     border-top-right-radius: 3/4rem;
     border-bottom-right-radius: 3/4rem;
     left: 0;
     top:2.5rem;
     text-align: center;
   }
  &-date,&-canceldate{
            padding: 3rem 3/4rem 1rem;
            font-size: 3/4rem;
            color: #aaa;
  &-text{
     color:#0099ff;
     magin-left:0.15rem
   }
  &-cancelText{
     color: #ff0000;
     font-weight: bold;
   }
  }
  &-canceldate{
     padding-top: 1.5rem;
   }
  &-btn{
     position: absolute;
     height: 98/40rem;
     line-height: 98/40rem;
     width: 100%;
     bottom: 0;
     left: 0;
     font-size: 34/40rem;
     text-align: center;
     color:#fff;
     background-color: #00b0f0;
   }
  &-cancelimg{
     height: 266/40rem;
     width: 154/40rem;
     padding-top: 0.5rem;
     margin: 0 auto;
  img{
    width: 100%;
    height: 100%;
  }
  }
  &-img{
     height: 78/40rem;
     width: 112/40rem;
     position: absolute;
     top:116/40rem;
     right: 0.4rem;
  img{
    width: 100%;
    height: 100%;
  }
  }
  }
  .remind-cancel{
    height: 698/40rem;
    display: block;
  }
  .remind-actionbtn-left,.remind-actionbtn-right{
    float: left;
    height: 100%;
    line-height: 98/40rem;
  }
  .remind-actionbtn-left{
    width: 35%;
    background-color: #eee;
    color:#aaa;
  }
  .remind-actionbtn-right{
    width: 65%;
  }
  #show{
    transform: translate(0,0);
    -webkit-transform: translate(0,0);
  }
</style>
<script>
  import Picker from 'vux/picker'
  //初始化日期选择数组
  let hours = []
  let mins = []
  for (let i = 0; i < 24; i++) {
    hours.push(i + ' 时')
  }
  for (let i = 0; i < 60; i++) {
    mins.push((i < 10 ? ('0' + i) : i) + ' 分')
  }
  export default {
    props: {
      isRemindShow: {
        type: Boolean,
        default: false
      },
      isRemoveRemindShow: {
        type: Boolean,
        default: false
      },
      remindTimeStart: {
        type: Object
      },
      remindTimeEnd: {
        type: Object
      },
      remindTimeData: {
        type: Array
      }
    },
    data () {
      return {
        remindTimeList: [hours, mins],   //  提醒时间选择的列表
        isCheckTipShow: false,    //toast显示状态
        remindCheckTip: '',  //toast的内容
        remindTimeValue: [hours[0], mins[0]]
      }
    },
    events: {
      /**
       * 定时器picker归零
       **/
      'clearTimePicker': function () {
        this.remindTimeValue = [hours[0], mins[0]]
      },
      'showCheckTipSet': function () {
        this.showCheckTip('设置成功')
      },
      'showCheckTipCancel': function () {
        this.showCheckTip('取消成功')
      }
    },
    methods: {
      /**
       * 关闭模态层和定时弹窗
       **/
      closeModal () {
        this.$emit('close-modal')
      },
      /**
       * 定时器选择函数
       **/
      onSetTimeChange (value) {
        this.$emit('on-set-time-change', value)
      },
      /**
       * 显示toast
       **/
      showCheckTip (txt) {
        this.isCheckTipShow = true
        this.remindCheckTip = txt
        let me = this
        setTimeout(() => {
          me.isCheckTipShow = false
        }, 1000)
      },
      //设置提醒
      setRemind () {
        this.$emit('set-remind')
      },
      //取消提醒
      removeRemind () {
        this.$emit('get-remove-remind')
      }
    },
    components: {
      Picker
    }
  }
</script>

