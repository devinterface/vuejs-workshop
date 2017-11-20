<template lang="pug">
  #posts_container.mt-5
    | posts page

    ol
      li(v-for='post in posts') {{ post.title }}

</template>

<script>
import PostsService from '../services/PostsService'

export default {
  name: 'Posts',
  data () {
    return {
      posts: []
    }
  },

  methods: {
    getPosts: async function () {
      this.posts = await PostsService.index()
    }
  },

  created: function () {
    this.getPosts()
  }
}
</script>

<style lang="scss">
</style>
