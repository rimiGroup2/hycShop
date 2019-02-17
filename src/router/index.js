import Vue from 'vue'
import Router from 'vue-router'
// zhang
import ProductList from '@/pages/ProductList/ProductList'
import ProductDetail from '@/pages/ProductDetail/ProductDetail'
import Cart from '@/pages/Cart/Cart'
import Shipping from '@/pages/Shipping/Shipping'
import Pay from '@/pages/Pay/Pay'

// jiang
import Home from '@/pages/Home/Home'
import Search from '@/pages/Search/Search'
import Login from '@/pages/Login/Login'
import Register from '@/pages/Register/Register'
import Profile from '@/pages/Profile/Profile'
import Forgetpassword from '@/pages/Forgetpassword/Forgetpassword'
import Updatepassword from '@/pages/Update/Updatepassword'
import Updateinfo from '@/pages/Update/Updateinfo'
import Updateadress from '@/pages/Update/Updateadress'
import user from '@/pages/User/User'
import Footprint from '@/pages/Footprint/Footprint'

// xiao
import category from '@/pages/category/Category'
import orderList from '@/pages/Orderlist/Orderlist'
import orderDetails from '@/pages/OrderDetails/Order-details'
import userLike from '@/pages/UserLike/user-like'

Vue.use(Router)

export default new Router({
  mode : 'history',
  routes: [
    {
      path:'/',
      redirect:'/home'},
    {
      path: '/home',
      name: 'Home',
      component:Home,
      meta: {
          index: 1
      }
    },{
      path: '/ProductList',
      name: 'ProductList',
      component: ProductList,
      meta: {
          index: 2
      }
    },{
      path: '/ProductDetail',
      name: 'ProductDetail',
      component: ProductDetail,
      meta: {
          index: 3
      }
    },{
      path: '/Cart',
      name: 'Cart',
      component: Cart,
      meta: {
          index: 1
      }
    },{
      path: '/Shipping',
      name: 'Shipping',
      component: Shipping,
      meta: {
          index: 2
      }
    },{
      path: '/search',
      name: 'Search',
      component:Search,
      meta: {
          index: 1
      }
    },{
      path: '/login',
      name: 'Login',
      component:Login,
      meta: {
          index: 2
      }
    },{
      path: '/register',
      name: 'Register',
      component:Register,
      meta: {
          index: 2
      }
    },{
      path: '/profile',
      name: 'Profile',
      component:Profile,
      meta: {
          index: 3
      }
    },{
      path: '/updatepassword',
      name: 'Updatepassword',
      component:Updatepassword,
      meta: {
          index: 4
      }
    },{
      path: '/updateinfo',
      name: 'Updateinfo',
      component:Updateinfo,
      meta: {
          index: 4
      }
    },{
      path: '/updateadress',
      name: 'Updateadress',
      component:Updateadress,
      meta: {
          index: 4
      }
    },{
      path: '/forgetpassword',
      name: 'Forgetpassword',
      component:Forgetpassword,
      meta: {
          index: 4
      }
    },{
      path:'/user',
      name:'user',
      component:user,
      meta: {
          index: 1
      }
    },{
      path:'/footprint',
      name:'Footprint',
      component:Footprint,
      meta: {
          index: 3
      }
    },
    {
      path: '/category',
      name: 'category',
      component: category,
      meta: {
          index: 1
      }
    },
    {
      path:'/orderList',
      name:'orderList',
      component:orderList,
      meta: {
          index: 2
      }
    },
    {
      path:'/orderDetails',
      name:'orderDetails',
      component:orderDetails,
      meta: {
          index: 3
      }
    },
    {
      path:'/userLike',
      name:'userLike',
      component:userLike,
      meta: {
          index: 2
      }
    },
    {
      path:'/pay',
      name:'pay',
      component:Pay,
      meta: {
          index: 4
      }
    }
  ]
})
