/**
 * Created by jun on 2016/12/16.
 * 作业报告 星星
 */
<template>
  <div class="ict-star">
    <span class="ict-star-item" v-for="i in max"
          :class="{'deactive': value <= i, 'active':value > i, 'half-active': value > i && value < (i+1), }"
          :style="{fontSize: fontSize + 'rem'}"
    ></span>
  </div>
</template>

<script>
  export default {
    props: {
      max: {
        type: Number,
        default: 5
      },
      value: {
        type: Number,
        default: 0
      },
      fontSize: {
        type: Number,
        default: 25
      }
    }
  }
</script>

<style lang="less">
.ict-star{
	.ict-star-item{
    margin: 0 0.2em;
    font-family: 'myicon';
    color: #fbc02d;
	}
	.active{
		&:after{
      content: '\e923';
		}
	}
	.half-active{
		&:after{
      content: '\e921';
		}
	}
	.deactive{
		&:after{
      content: '\e922';
		}
	}
}
</style>

