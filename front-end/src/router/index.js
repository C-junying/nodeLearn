import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  // 所有routes数组中的元素都是一级路由,在app.vue<router-view />中展示
  // 
  routes: [
    {
      path:'/',
      name:'login',
      component:()=>import("@/view/login")
    },
    {
      path:'/index',
      name:'index',
      component:()=>import("@/view/index"),
      children:[
        {
          path:'/system/user',
          name:'user',
          component:()=>import("@/view/system/user")
        },
        {
          path:'/system/menu',
          name:'menu',
          component:()=>import("@/view/system/menu")
        },
        {
          path: '/system/hello',
          name: 'HelloWorld',
          component: () => import("@/components/HelloWorld")
        },
        {
          path: '/system/role',
          name: 'order',
          component: () => import("@/view/system/roles/role")
        },
        {
          path: '/system/order',
          name: 'order',
          component: () => import("@/view/system/order")
        },
        {
          path: '/goods/goodsList',
          name: 'goods',
          component: () => import("@/view/goods/goods")
        },
      ]
    },
  ]
})
