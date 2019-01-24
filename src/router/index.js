import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home/Home'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {path:'/',redirect:'/Home'},
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Home',
      name: 'Home',
      component:Home
    }
  ]
})
