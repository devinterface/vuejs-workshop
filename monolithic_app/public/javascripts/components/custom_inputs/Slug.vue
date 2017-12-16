<template lang="pug">
  .row.pr-3.pl-3
    input.col(v-model="fakeSlug", class="form-control mr-2", :type="text", style="")
    input.col(:value="slug", class="form-control", :type="text", readonly)
</template>


<script>
  export default {
    name: 'SlugInput',
    props: {
      inputValue: {
        type: String
      }
    },
    data () {
      return {
        fakeSlug: this.inputValue,
        fakeSlugInitValue: undefined
      }
    },
    methods: {
      createSlug: function(text) {
        return window._(text).toString().trim().toLowerCase().replace(/ /g, '-').replace(/([^a-zA-Z0-9\._-]+)/, '');
      }
    },
    computed: {
      slug: function() {
        let slugText = this.createSlug(this.fakeSlug)
        return slugText;
      }
    },
    watch: {
      fakeSlug: function(newFakeSlug,_) {
        let context = this
        this.$emit('input', this.createSlug(newFakeSlug))
      },
      fakeSlugInitValue: function(newFakeSlugInitValue, _) {
        this.fakeSlug = newFakeSlugInitValue
      }
    }
  }
</script>
