<template lang="pug">
  #posts_new_container.mt-5
    slot(name="title")

    hr/
    #posts_form_container.mt-5
      form
        .form-group
          label(for='postTitle') Title
          input.form-control(type='text', placeholder='Title', v-model='post.title')

        .form-group
          label(for='postSlug') Slug
          input.form-control(type='text', :value='post.slug', readonly)

        .form-group
          label(for='postBody') Body
          textarea.form-control(rows="3", placeholder='Body', v-model='post.body')

        .float-right
          button.btn.btn-primary(type="submit", @click.prevent="onSubmit()") Submit
</template>

<script>
export default {
  props: ['post'],
  methods: {
    onSubmit: function() {
      let context = this
      axios.post(`/en/posts/${context.post.id}`, {
              data: this.post
          })
          .then((response) => {
              context.$globalEventBus.$emit('toastrSuccess', 'Post updated!')
          })
    },
    destroyPost: function() {
      let context = this


      if (window.confirm('Do you really want to remove this post?')) {
        axios.delete(`/en/posts/${context.post.id}`)
          .then((response) => {
              context.$globalEventBus.$emit('toastrSuccess', 'Post destroyed!')
              setTimeout( () => window.location.href = '/en/posts', 2000)
          })
      }
    }
  }
}
</script>

<style>

</style>
