import Vue from 'vue'
import Router from 'vue-router'

// components
import HomeComponent from '@/components/Home'
import AboutComponent from '@/components/About'
import SignInComponent from '@/components/SignIn'
import PostsComponent from '@/components/posts/Posts'
import PostsIndexComponent from '@/components/posts/PostsIndex'
import PostsShowComponent from '@/components/posts/PostsShow'
import PostsNewComponent from '@/components/posts/PostsNew'
import PostsEditComponent from '@/components/posts/PostsEdit'

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
      component: PostsComponent,
      children: [
        {
          path: '',
          name: 'PostsIndex',
          component: PostsIndexComponent
        },
        {
          path: 'new',
          name: 'PostsNew',
          component: PostsNewComponent
        },
        {
          path: ':id/edit',
          name: 'PostsEdit',
          component: PostsEditComponent
        },
        {
          path: ':id',
          name: 'PostsShow',
          component: PostsShowComponent
        }
      ]
    }
  ]
})
