import Vue from 'vue'
import Router from 'vue-router'
import category from '@/components/category/Category'
import user from '@/components/User/User'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/category',
      name: 'category',
      component: category
    },
    {
      path:'/user',
      name:'user',
      component:user
    }
  ]
})
