<template lang="pug">
  #posts_index_container.mt-5

    .row
      .col-md-12
        h2 Posts

        router-link.btn.btn-primary.float-right(:to="{ name: 'PostsNew' }")
          | New Post

    .row
      .col-md-4(v-for='post in posts')
        .card.mt-4
          .card-header
            | {{ post.id }}
            | -
            | {{ post.title }}
            | 
            router-link.btn.btn-secondary.btn-sm.float-right(:to="{ name: 'PostsShow', params: { id: post.id } }")
              | Show Post

          .card-body {{ postPreview(post) }}

</template>

<script>
import PostsService from '../../services/PostsService'

export default {
  name: 'PostsIndex',
  data () {
    return {
      posts: []
    }
  },

  methods: {
    getPosts: async function () {
      this.posts = await PostsService.index()
    },

    postPreview: function (post) {
      let postPreviewLimit = 30

      if (post.body && post.body.length > postPreviewLimit) {
        return `${post.body.substring(0, postPreviewLimit)}...`
      } else {
        return post.body
      }
    }
  },

  mounted: function () {
    this.getPosts()
  }
}
</script>

<style lang="scss">
</style>
