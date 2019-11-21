import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index'
import home from '../pages/home'
import category from '../pages/category'
import cart from '../pages/cart'
import my from '../pages/my'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/index",
      component: index,
      children: [
        {
          path: 'home',
          component: home
        },{
          path: 'category',
          component: category
        },{
          path: 'cart',
          component: cart
        },{
          path: 'my',
          component: my
        }
      ]
    }
  ]
})
