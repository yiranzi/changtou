<!--
  input控件
-->
<template>
  <div style="margin-right: 12%; margin-left: 12%">
    <div class="ict-input-container">
      <label class="title">{{title}}</label>
      <input :type="type"
             v-model="value"
             :placeholder="placeholder"
             @blur="onBlur"
             @focus="onFocus"
             v-el:input >
      <span class="eye" v-touch:tap="toggle" v-bind:class="{'hide': isHidePassword}" v-if="isShowToggle"></span>
    </div>
    <hr style="opacity: 0.3; color: #ccc; height: 1px; margin: 0;"/>
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
        isShowToggle: false
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
        this.$dispatch('ictInputFoucs')
      },

      onBlur () {
        this.$dispatch('ictInputBlur')
      },

      toggle () {
        this.isHidePassword = !this.isHidePassword
      }
    }
  }
</script>

<style lang="less">
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
</style>
