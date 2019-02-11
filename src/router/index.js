import Vue from 'vue'
import Router from 'vue-router'
import category from '@/components/category/Category'
import user from '@/components/User/User'
import setting from '@/components/User/UserSetting'
import updatePassword from '@/components/User/update-password.vue'
import updateInformation from '@/components/User/update-information.vue'
import shipping from '@/components/User/shipping.vue'
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
      component:user,
    },
    {
      path:'/setting',
      name:'setting',
      component:setting,
    },
    {
      path:'/update-password',
      name:'updatePassword',
      component:updatePassword,
    },
    {
      path:'/update-information',
      name:'updateInformation',
      component:updateInformation
    },
    {
      path:'/shipping',
      name:'shipping',
      component:shipping
    }
  ]
})
