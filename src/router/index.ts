import { id } from 'element-plus/es/locale'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('views/home/home.vue')
  },
  {
    path: '/search/:keyword?',
    name: 'search',
    component: () => import('views/search/search.vue')
  },
  {
    path: '/login',
    component: () => import('views/login/login.vue'),
    beforeEnter: (to:any, from:any, next:any) => {
      if(localStorage.getItem('token')) {
        next({
          path: from.fullPath
        })
      }
      next()
    }
  },
  {
    path: '/register',
    component: () => import('views/register/register.vue')
  },
  {
    path: '/detail',
    component: () => import('views/detailpage/detailpage.vue')
  },
  {
    path: '/addcartsuccess',
    component: () => import('views/addcartsuccess/addcartsuccess.vue')
  },
  {
    path: '/shopcart',
    component: () => import('views/shopcart/shopcart.vue')
  },
  {
    path: '/trade',
    component: () => import('views/trade/trade.vue')
  },
  {
    path: '/pay',
    component: () => import('views/pay/pay.vue'),
    beforeEnter: (to:any, from:any, next:any) => {
      if (from.fullPath =='/trade') {
        next()
      } else {
        next({
          path: from.fullPath
        })
      }
    }
  },
  {
    path: '/paysuccess',
    component: () => import('views/paysuccess/paysuccess.vue'),
    beforeEnter: (to:any, from:any, next:any) => {
      const pathx = from.fullPath.substr(0,5)
      if (pathx == '/pay?') {
        next()
      }
      next(from.fullPath)
    }
  },
  {
    path: '/center',
    component: () => import('views/center/center.vue'),
    children: [
      {
        path: '/center/',
        redirect: '/center/myorder'
      },
      {
        path: '/center/myorder',
        component: () => import('views/center/childrencomps/myorder.vue')
      },
      {
        path: '/center/grpuporder',
        component: () => import('views/center/childrencomps/grpuporder.vue')
      }
    ]
  }
]
const routerlist = ['/shopcart', '/trade', '/pay', '/center/myorder', '/paysuccess', '/center/grpuporder',]
const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior(to, from) {
    if (to.path === '/detail') {
      return {
        top: 0
      }
    }
  },
})

router.beforeEach((to, from, next) => {
  if (routerlist.indexOf(to.fullPath) !== -1) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          frompath: from.fullPath
        }
      })
    }
  } else {
    next()
  }


})

export default router