<template lang="pug">
  #posts_new_container.mt-5
    slot(name="title")
    .card
      .card-header
        small (Slug: {{ post.slug }})
        a.btn.btn-danger.float-right.ml-2(href="#", @click.prevent="destroyPost()")
          | Delete Post
        a.btn.btn-primary.float-right(:href="`/en/posts/${post.id}/edit`")
          | Edit Post
      .card-body {{ post.body }}
</template>

<script>
export default {
  props: ["post"],
  methods: {
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
