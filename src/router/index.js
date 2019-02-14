import Vue from 'vue'
import Router from 'vue-router'
import ProductList from '@/pages/ProductList/ProductList'
import ProductDetail from '@/pages/ProductDetail/ProductDetail'
import Cart from '@/pages/Cart/Cart'
// import Order from '@/pages/Order/Order'
import Shipping from '@/pages/Shipping/Shipping'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProductList',
      component: ProductList
    },{
      path: '/ProductList',
      name: 'ProductList',
      component: ProductList
    },{
      path: '/ProductDetail',
      name: 'ProductDetail',
      component: ProductDetail
    },{
      path: '/Cart',
      name: 'Cart',
      component: Cart
    },{
      path: '/Shipping',
      name: 'Shipping',
      component: Shipping
    }
  ]
})
