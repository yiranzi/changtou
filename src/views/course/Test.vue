<template>
  <div v-for="index in list" v-touch:tap="go(index)">{{index}}</div>
</template>

<script>
  export default {
      data () {
          return {
            list: [1, 2, 3, 4]
            }
          },
    methods: {
        go (topicId) {
//          console.log(topicId)
          this.$route.router.go(`/topic-article/list/${topicId}`)
        }
    }
  }
</script>
