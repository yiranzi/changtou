<template>
    <div class="column-change">
      <div class="background">
        <div class="column-top">
          <img class="bigpic" src='../../../static/image/navigator/column-change.png'>
          <p class="txt">{{componentData}}</p>
        </div>
        <div class="mycenter column-bottom">
          <ict-button class="mycenter button exit"v-touch:tap="onCloseTap">知道了</ict-button>
          <ict-button class="mycenter button go"v-touch:tap="onContentChangeTap">去看看</ict-button>
        </div>
      </div>
    </div>
</template>
<style lang = "less">
  .column-change {
    .background{
      width: 12rem;
      height: 17rem;
      border-radius:20px;
      .column-top{
        border-radius: 0.5rem 0.5rem 0 0;
        padding: 2.5rem 1rem 0 1rem;
        background-color: #fafafa;
        width: 10rem;
        height: 10.75rem;
        text-align: center;
        .bigpic{
          width: 4.5rem;
          height: 4.35rem;
        }
        .txt{
          font-size: 0.7rem;
          color: #888;
        }
      }
      .column-bottom {
        border-radius: 0 0 0.5rem 0.5rem;
        height: 3.75rem;
        padding: 0 0.75rem 0 0.75rem;
        background-color: #e7e7e7;
        .button {
          width: 4.8rem;
          height: 1.6rem;
          .go {
            background-color: #ffc82f;
            color: #444;
          }
          .eixt {
            background-color: #eee;
            color: #999;
          }
        }
      }
    }
    .mycenter{
      display: flex;
      justify-content: space-around;
      align-self: center;
    }
  }

</style>
<script>
    import IctButton from '../IctButton.vue'
    export default {
      data () {
          return {}
      },
      components: {
        IctButton
      },
      methods: {
        onContentChangeTap () {
          this.$dispatch('onColumnChange')
        },
        onCloseTap () {
          this.$dispatch('hideMask')
        }
      },
      props: {
        componentData: String
      }
    }
</script>
