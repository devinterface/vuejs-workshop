<template lang="pug">
  #app
    b-navbar(toggleable='md', type='dark', variant='dark')
      b-navbar-toggle(target='nav_collapse')
      b-navbar-brand(href='#') VueJS Workshop
      b-collapse#nav_collapse(is-nav='')
        b-navbar-nav(v-show='authenticated()')
          b-nav-item(:to="{ name: 'Posts' }")

        b-navbar-nav.ml-auto
          b-nav-item-dropdown(right='')
            // Using button-content slot
            template(slot='button-content')
              em User
            b-dropdown-item(:to="{ name: 'SignIn' }", v-show="!authenticated()") Sign in
            b-dropdown-item(href='#', v-show="authenticated()", @click='performSignOut()') Logout
            

    .container-fluid
      router-view/
</template>

<script>
import AuthService from './services/AuthService'
import store from './store'
import router from './router'

export default {
  name: 'app',
  data () {
    return {}
  },
  methods: {
    authenticated: function () {
      return store.getStateData('jwtAuthToken')
    },

    performSignOut: function () {
      AuthService.signOut()
      router.push({ name: 'Home' })
    }
  }
}
</script>

<style lang="scss">
.card {
  .card-block {
    padding: 1.25rem;
  }
}

.btn {
  &:hover {
    cursor: pointer;
  }
}
</style>
