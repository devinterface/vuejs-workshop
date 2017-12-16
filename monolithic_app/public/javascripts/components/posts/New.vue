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
          slug-input(:inputValue="post.slug", v-on:input="onSlugFieldChange($event)")

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
    onSlugFieldChange: function(value) {
      Vue.set(this.post, "slug", value)
    },
    onSubmit: function() {
      let context = this
      axios.post('/en/posts/', {
              data: this.post
          })
          .then((response) => {
              context.$globalEventBus.$emit('toastrSuccess', 'Post created!')
              setTimeout(() => {
                window.location.href = `/en/posts/${response.data.id}/edit`
              }, 2000)
          })
    }
  }
}
</script>

<style>

</style>
