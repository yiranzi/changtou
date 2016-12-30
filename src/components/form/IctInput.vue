<!--
  input控件
-->
<template>
  <div v-bind:style="styleObject" class="ict-input-component">
    <div class="ict-input-container">
      <label class="title">{{title}}</label>
      <input :type="type"
             v-model="value"
             :placeholder="placeholder"
             :disabled="readonly"
             @blur="onBlur"
             @focus="onFocus"
             v-el:input >
      <span class="eye" v-touch:tap="toggle" v-bind:class="{'hide': isHidePassword}" v-if="isShowToggle"></span>
      <!--默认右边 spacer-->
      <span class="spacer" style="width: 20px" v-if="!isShowToggle"></span>
      <label v-if="rightTitle" class="right-title">{{rightTitle}}</label>
    </div>

    <hr class="line" v-bind:class="{'active': isFocus}"/>
  </div>
</template>

<script>
  export default{
    props: {
      type: {
        type: String,
        default: 'text'
      },
      title: {
        type: String
      },
      placeholder: {
        type: String,
        default: ''
      },
      readonly: {
        type: Boolean,
        default: false
      },
      value: {
//        required: true,
        // 双向绑定
        twoWay: true
      },
      isShowErrStyle: {
        type: Boolean,
        default: false,
        twoWay: true
      },
      //标题位置
      titlePosition: {
        type: String,
        default: 'center' // center | left
      },
      rightTitle: {
        type: String,
        default: ''
      },
      id: {
        type: String,
        default: 'ict-input'
      }
    },

    data () {
      return {
        isHidePassword: true,
        isShowToggle: false,
        isFocus: false
//        styleObject: {
//          marginRight: '12%',
//          marginLeft: '12%'
//        }
       }
    },

    computed: {
      styleObject () {
        if (this.titlePosition === 'center') {
          return {
            marginRight: '12%',
            marginLeft: '12%'
          }
        } else if (this.titlePosition === 'left') {
          return {
            marginRight: '15px',
            marginLeft: '15px'
          }
        }
      }
    },

    watch: {
      'isHidePassword': function (newVal) {
          this.type = newVal ? 'password' : 'text'
      }
    },

    methods: {
      onFocus () {
        if (this.type === 'password') {
          this.isShowToggle = true
        }
        this.isFocus = true
        this.$dispatch('ictInputFocus', this.id)
      },

      onBlur () {
        this.isFocus = false
        this.$dispatch('ictInputBlur', this.id)
      },

      getFocusState () {
        return this.isFocus
      },

      blur () {
        const {input} = this.$els
        input.blur()
      },
      /**
       * 明码 ,暗码转换
       */
      toggle () {
        this.isHidePassword = !this.isHidePassword
      }
    }
  }
</script>

<style lang="less">
  .ict-input-component {
    .ict-input-container {
      background-color: transparent;
      border: 0;
      height: 2rem;
      width: 100%;

      display: flex;
      align-items: center;

      .title {
        font-size: 0.75rem;
        font-weight: bold;
        min-width: 3.5rem;
      }

      input {
        position: relative;
        top: 2px;
        flex: 1;
        border-top-color: initial;
        border-top-style: initial;
        border-top-width: 0px;
        border-right-color: initial;
        border-right-style: initial;
        border-right-width: 0px;
        border-bottom-color: initial;
        border-bottom-style: initial;
        border-bottom-width: 0px;
        border-left-color: initial;
        border-left-style: initial;
        border-left-width: 0px;
        outline-color: initial;
        outline-style: initial;
        outline-width: 0px;
        line-height: 0.75rem;
        font-size: 0.75rem;
        color: inherit;
        background-color: transparent;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
      }

      .eye {
        width: 20px;
        height: 20px;
      }

      .eye::before {
        font-family: 'myicon';
        content: '\e912';
        color: #007aff;
        font-size: 1rem !important;
      }

      .right-title {
        font-size: 0.65rem;
        color: #aaa;
        min-width: 4.5rem;
      }
      .hide::before {
        color: #bbb;
      }
    }
    .line {
      opacity: 0.6;
      background: #ccc;
      height: 1px;
      margin: 0;
      border: 0;
    }
    .active {
      background: #00bff0;
    }
  }
</style>
