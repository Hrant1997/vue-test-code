import Vue from 'vue'
import Router from 'vue-router'
import Profiles from '@/components/Profiles'
import CreateProfile from '@/components/CreateProfile'
import EditProfile from '@/components/EditProfile'
import Hello from '@/views/Hello'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/profiles',
      name: 'Profiles',
      component: Profiles
    },
    {
      path: '/profiles/create',
      name: 'CreateProfile',
      component: CreateProfile
    },
    {
      path: '/profiles/:id',
      name: 'EditProfile',
      component: EditProfile
    }
  ]
})
