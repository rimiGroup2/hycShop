import Vue from 'vue'
import Router from 'vue-router'
import category from '@/pages/category/Category'
import orderList from '@/pages/Orderlist/Orderlist'
import orderDetails from '@/pages/OrderDetails/Order-details'
import userLike from '@/pages/UserLike/user-like'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/category',
      name: 'category',
      component: category
    },
    {
      path:'/orderList',
      name:'orderList',
      component:orderList
    },
    {
      path:'/orderDetails',
      name:'orderDetails',
      component:orderDetails
    },
    {
      path:'/userLike',
      name:'userLike',
      component:userLike
    },
  ]
})
