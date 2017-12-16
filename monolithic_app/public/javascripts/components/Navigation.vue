<template lang="pug">
  nav.navbar.navbar-toggleable-md.navbar-light.bg-faded.bg-inverse
    button.navbar-toggler.navbar-toggler-right.text-white(type='button', data-toggle='collapse', data-target='#navbarSupportedContent', aria-controls='navbarSupportedContent', aria-expanded='false', aria-label='Toggle navigation')
      span.navbar-toggler-icon
    a.navbar-brand.text-white(href='/en')
       | VueJS Workshop
    #navbarSupportedContent.collapse.navbar-collapse
      ul.navbar-nav.mr-auto
        li.nav-item
          a.text-white(href="/en/posts", class="nav-link")
            | Posts
      div(class="ml-auto navbar-nav dropdown")
        button(class="btn btn-secondary dropdown-toggle", type="button", id="dropdownMenuButton", data-toggle="dropdown", aria-haspopup="true", aria-expanded="false")
          | User
        div(class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton")
          a(href="/en/login", class="dropdown-item", role="menuitem", v-show="!isAuthenticated")
            | Sign in
          a(role="menuitem", href="/en/logout", class="dropdown-item", v-show="isAuthenticated")
            | Logout
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {

    }
  },
  computed: {
    isAuthenticated: function() {
      let value = this.user !== undefined
      return value
    }
  }
}
</script>

<style>

</style>
