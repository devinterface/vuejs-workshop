import Vue from 'vue'
import Router from 'vue-router'

// components
import HomeComponent from '@/components/Home'
import AboutComponent from '@/components/About'
import SignInComponent from '@/components/SignIn'
import PostsComponent from '@/components/Posts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeComponent
    },
    {
      path: '/about',
      name: 'About',
      component: AboutComponent
    },
    {
      path: '/sign_in',
      name: 'SignIn',
      component: SignInComponent
    },
    {
      path: '/posts',
      name: 'Posts',
      component: PostsComponent
    }

  ]
})
