/**
 * Created by jun on 2016/11/15.
 *
 */
<template>
    <div class="strategy-suitable-product">
      <strategy-header><slot></slot></strategy-header>
      <div class="strategy">
        <div class="strategy-options" v-for="product in suitableProduct">
          <div class="strategy-up-item">
            <p class="strategy-options-title">{{product.title}}</p>
            <p class="strategy-options-subtitle">{{product.subtitle}}</p>
            <p class="labels">
              <span class="strategy-options-labels" v-for="label in product.labels">{{label}}</span>
            </p>
          </div>
          <p v-for="course in product.related" class="strategy-options-related-item"
             v-touch:tap="goToCourse(course.type,course.itemType,course.itemId)">
            {{course.itemName}}》
            <span class="play-icon" ></span>
          </p>
          <div class="strategy-options-intro">
            <p v-for="item in product.intro">{{item}}</p>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import strategyHeader from './StrategyHeader.vue'
export default {
  props: {
    strategyOptions: Array
  },
  computed: {
    suitableProduct () {
      if (this.strategyOptions) {
        let suitableProduct = this.strategyOptions && this.strategyOptions.concat()

        for (let i = 0, length = suitableProduct.length; i < length; i++) {
          suitableProduct[i].labels = this.strategyOptions[i].labels.split('#')
          suitableProduct[i].intro = this.strategyOptions[i].intro.replace(/#/g, '#●').split('#')
        }

        return suitableProduct
      }
    }
  },
  methods: {
    goToCourse () {

    }
  },
  components: {
    strategyHeader
  }
}
</script>
<style lang="less">
  .strategy-suitable-product{
    .strategy-options {
      margin-bottom: 0.5rem;
      text-align: left;
      .strategy-up-item {
        position: relative;
        padding: 1rem 2rem 0;
        background: #96abe0;
        color: #fff;
      }
      .strategy-options-intro {
        padding: 1rem 2rem;
        background: #eaeef9;
        font-size: 0.6rem;
        color: #aaa;
      }
    }

    .strategy-options-title {
      font-size: 0.75rem;
    }
    .strategy-options-subtitle {
      font-size: 0.6rem;
    }
    .strategy-options-labels {
      display: inline-block;
      margin: 0.5rem 0.8rem 0.85rem 0;
      padding: 0 0.35rem;
      border-radius: 10px;
      background: #fff;
      line-height: 1rem;
      font-size: 0.6rem;
      color: #96abe0;
    }

    .strategy-options-related-item {
      position: relative;
      width: 100%;
      border: 0;
      height: 1.75rem;
      line-height: 1.75rem;
      padding: 0 2rem;
      background: #96abe0;
      font-size: 0.6rem;
      color: #fff;

      .play-icon:before {
        position: absolute;
        right: 2.25rem;
        font-family: 'myicon';
        content: '\e907';
        font-size: 0.9rem;
      }
      &:nth-child(1){
        .play-icon:before {
          top: -2.25rem;
          right: 2rem;
          font-size: 1.4rem;
        }
      }
    }


    .strategy {
      p{
        margin: 0;
      }
      .strategy-options:nth-of-type(2) {
        .strategy-up-item {
          background: #79c9d6;
        }
        .strategy-options-labels {
          color: #79c9d6;
        }
        .strategy-options-intro {
          background: #e4f4f7;
        }
        .strategy-options-related-item {
          background: #79c9d6;
        }
      }
      .strategy-options:nth-of-type(3) {
        .strategy-up-item {
          background: #87bef0;
        }
        .strategy-options-labels {
          color: #87bef0;
        }
        .strategy-options-intro {
          background: #e7f2fc;
        }
        .strategy-options-related-item {
          background: #87bef0;
          &:nth-child(2){
            background: #b7d8f6;
          }
        }

      }
    }
  }
</style>
