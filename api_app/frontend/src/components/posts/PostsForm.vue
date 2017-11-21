<template lang="pug">
  #posts_form_container.mt-5
    
    b-alert(variant="danger", dismissible, :show="showErrorsAlert()")
      | {{ errors }}


    form
      .form-group
        label(for='postTitle') Title
        input#postTitle.form-control(type='text', placeholder='Title', v-model='post.title')

      .form-group
        label(for='postSlug') Slug
        input#postSlug.form-control(type='text', placeholder='Slug', v-model='post.slug', readonly)

      .form-group
        label(for='postBody') Body
        textarea#postBody.form-control(rows="3", placeholder='Body', v-model='post.body')

      .float-right
        button.btn.btn-primary(type="submit", @click.prevent="submitForm()") Submit

</template>

<script>

export default {
  name: 'PostsForm',
  props: {
    bus: {
      type: Object,
      default: null
    },
    errors: {
      type: Object,
      default: null
    },
    post: {
      type: Object,
      default: null
    }
  },

  data () {
    return {}
  },

  watch: {
    'post.title': function () {
      this.updateSlug()
    }
  },

  methods: {
    submitForm: function () {
      this.bus.$emit('postsFormSubmitted')
    },

    showErrorsAlert: function () {
      let res
      if (this.errors) {
        res = true
      } else {
        res = false
      }
      return res
    },

    updateSlug: function () {
      let str = this.post.title
      str = str.replace(/^\s+|\s+$/g, '')
      str = str.toLowerCase()

      var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'
      var to = 'aaaaeeeeiiiioooouuuunc------'
      for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
      }

      str = str.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')

      this.post.slug = str
    }
  }
}
</script>

<style lang="scss">
</style>
