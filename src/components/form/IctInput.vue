<!--
  input控件
-->
<template>
  <div style="margin-right: 12%; margin-left: 12%" class="ict-input-component">
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
      }
    },

    data () {
      return {
        isHidePassword: true,
        isShowToggle: false,
        isFocus: false
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
        this.$dispatch('ictInputFocus')
      },

      onBlur () {
        this.isFocus = false
        this.$dispatch('ictInputBlur')
      },

      getFocusState () {
        return this.isFocus
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
        width: 4.5rem;
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
      }

      .eye {
        width: 20px;
        height: 20px;
      }

      .eye::before {
        font-family: 'myicon';
        content: '\e912';
        color: #00b0f0;
        font-size: 1rem !important;
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
