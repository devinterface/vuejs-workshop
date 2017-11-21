<template lang="pug">
  #home_container
    .row
      .col-md-4.offset-md-4
        .card.mt-4
          .card-header
            | Sign in
          .card-block
            .form-group
              label(for='formEmail') Email
              input#formEmail.form-control(type='email', placeholder='Email', v-model='form.email', name="form.email")
            .form-group
              label(for='formPassword') Password
              input#formPassword.form-control(type='password', placeholder='Password', v-model='form.password', name="form.password")

            button(type="button", class="btn btn-primary float-right", @click="performSignIn()") Sign In


</template>

<script>

import AuthService from '../services/AuthService'
import router from '../router'

export default {
  name: 'SignIn',
  data () {
    return {
      form: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    performSignIn: async function () {
      let self = this

      let result = await AuthService.signIn({
        email: self.form.email,
        password: self.form.password
      })

      if (result) {
        router.push({ name: 'PostsIndex' })
      }
    }
  }
}
</script>

<style lang="scss">
</style>
