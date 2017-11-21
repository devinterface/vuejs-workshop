<template lang="pug">
  #posts_show_container.mt-5
    h2 Show Post

    .card(v-if='post')
      .card-header
        | {{ post.title }}
        | 
        small (Slug: {{ post.slug }})

        a.btn.btn-danger.float-right.ml-2(href="#", @click.prevent="destroyPost()")
          | Remove

        router-link.btn.btn-primary.float-right(:to="{ name: 'PostsEdit', params: { id: post.id } }")
          | Edit

      .card-body
        | {{ post.body }}

</template>

<script>
import PostsService from '../../services/PostsService'
import router from '../../router'

export default {
  name: 'PostsShow',
  data () {
    return {
      post: null
    }
  },

  methods: {
    getPost: async function (postId) {
      this.post = await PostsService.show(postId)
    },

    destroyPost: async function () {
      let self = this

      if (window.confirm('Do you really want to remove this post?')) {
        let res = await PostsService.destroy(self.post.id)
        if (res.errors) {
          alert(`Error removing post: ${res.errors}`)
        } else {
          router.push({ name: 'PostsIndex' })
        }
      }
    }
  },

  mounted: function () {
    let postId = this.$route.params.id
    this.getPost(postId)
  }
}
</script>

<style lang="scss">
</style>
