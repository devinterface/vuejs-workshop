<template lang="pug">
  #posts_new_container.mt-5
    h2 New Post

    posts-form(name='posts.new', :bus='this', :post='post', :errors='errors')

</template>

<script>
import PostsService from '../../services/PostsService'
import PostsForm from './PostsForm.vue'
import router from '../../router'

export default {
  name: 'PostsNew',

  components: {
    PostsForm
  },

  data () {
    return {
      post: {},
      errors: null
    }
  },

  methods: {
    createPost: async function () {
      let res = await PostsService.create({
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

  created: function () {
    this.$on('postsFormSubmitted', () => {
      this.createPost()
    })
  }
}
</script>

<style lang="scss">
</style>
