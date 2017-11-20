<template lang="pug">
  #home_container.text-center.mt-5
    h2 {{ title }}
    p {{ subtitle }}

    hr/

    h4.mt-5 Basic VueRouter usage
    p
      | Click 
      router-link(:to="{ name: 'About' }") HERE
      |  to visit About page using component name
    p
      | Click 
      router-link(to='/about') HERE
      |  to visit About page using path directly

</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      title: 'DevInterface VueJS Workshop',
      subtitle: "This is our awesome VueJS Workshop! Hope you'll enjoy it!"
    }
  }
}
</script>

<style lang="scss">
</style>
