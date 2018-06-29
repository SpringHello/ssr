<template>
  <div>
    <div v-for="type in articleType">
      {{type.typename}}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'art',
    asyncData ({store, route, cookies}) {
      return store.dispatch('getArticleType', {route, cookies})
    },
    data(){
      return {}
    },
    computed: {
      articleType(){
        console.log(this.$store.state.articleType)
        return this.$store.state.articleType
      }
    }
  }
</script>
