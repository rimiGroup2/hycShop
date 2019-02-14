import Vue from 'vue'
import Router from 'vue-router'
import category from '@/components/category/Category'
import orderList from '@/components/Orderlist/Orderlist'
import orderDetails from '@/components/Orderlist/Order-details'
import Home from '@/components/Home/Home'
import Search from '@/components/Search/Search'
import Login from '@/components/Login/Login'
import Register from '@/components/Register/Register'
import Profile from '@/components/Profile/Profile'
import Forgetpassword from '@/components/Forgetpassword/Forgetpassword'
import Updatepassword from '@/components/Update/Updatepassword'
import Updateinfo from '@/components/Update/Updateinfo'
import Updateadress from '@/components/Update/Updateadress'
import user from '@/components/User/User'
import Footprint from '@/components/Footprint/Footprint'
import payOrder from '@/components/PayOrder/pay-order'
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
      path: '/home',
      name: 'Home',
      component:Home
    },
    {
      path: '/search',
      name: 'Search',
      component:Search
    },
    {
      path: '/login',
      name: 'Login',
      component:Login
    },
    {
      path: '/register',
      name: 'Register',
      component:Register
    },
    {
      path: '/profile',
      name: 'Profile',
      component:Profile
    },
    {
      path: '/updatepassword',
      name: 'Updatepassword',
      component:Updatepassword
    },
    {
      path: '/updateinfo',
      name: 'Updateinfo',
      component:Updateinfo
    },
    {
      path: '/updateadress',
      name: 'Updateadress',
      component:Updateadress
    },
    {
      path: '/forgetpassword',
      name: 'Forgetpassword',
      component:Forgetpassword
    },
    {
      path:'/user',
      name:'user',
      component:user,
    },
    {
      path:'/footprint',
      name:'Footprint',
      component:Footprint,
    },
    {
      path:'/payOrder',
      name:'payOrder',
      component:payOrder
    }
  ]
})
