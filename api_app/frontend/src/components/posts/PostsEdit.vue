<template lang="pug">
  #posts_Edit_container.mt-5
    h2
      | Edit Post

    posts-form(v-if="post", :bus='this', :post="post", :errors="errors")

</template>

<script>
import PostsService from '../../services/PostsService'
import PostsForm from './PostsForm.vue'
import router from '../../router'

export default {
  name: 'PostsEdit',

  components: {
    PostsForm
  },

  data () {
    return {
      post: null,
      errors: null
    }
  },

  methods: {
    getPost: async function (postId) {
      this.post = await PostsService.show(postId)
    },
    updatePost: async function () {
      let res = await PostsService.update(this.post.id, {
        title: this.post.title,
        slug: this.post.slug,
        body: this.post.body
      })

      if (res.post) {
        router.push({ name: 'PostsShow', params: { id: res.post.id } })
      } else {
        this.errors = res.errors
      }
    }
  },

  mounted: function () {
    let postId = this.$route.params.id
    this.getPost(postId)
  },

  created: function () {
    this.$on('postsFormSubmitted', () => {
      this.updatePost()
    })
  }
}
</script>

<style lang="scss">
</style>
