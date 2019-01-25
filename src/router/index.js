import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home/Home'
import Search from '@/components/Search/Search'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {path:'/',redirect:'/home'},
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',
      name: 'Home',
      component:Home
    },
    {
      path: '/search',
      name: 'Search',
      component:Search
    }
  ]
})
