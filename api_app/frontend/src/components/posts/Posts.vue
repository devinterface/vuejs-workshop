<template lang="pug">
  #posts_container.mt-5
    .row
      .col-12
        h1 {{ title }}
    hr/

    router-view
        
</template>

<script>
export default {
  name: 'Posts',
  data () {
    return {
      title: 'Posts parent Component'
    }
  }
}
</script>

<style lang="scss">
</style>
