<template lang="pug">
  #posts-index.mt-5
    .row
      .col-md-12
        h2 {{ title }}
        a.btn.btn-primary.float-right(href="/en/posts/new")
          | New Post
    hr/
    .row
      .col-4(v-for='(post, index) in posts')
        .card.mt-4
          .card-header
            | {{ index + 1 }}
            | -
            | {{ post.title }}
            |
            a.btn.btn-secondary.btn-sm.float-right(:href="showUrlBuilder(post)")
              | Show Post

          .card-body {{ post.body | truncateText}}
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: () => "Dummy Text"
    }
  },
  methods: {
    showUrlBuilder: function(post) {
      return `/en/posts/${post.id}`
    }
  }
}
</script>

<style>

</style>
