import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/',
      component: () => import('@/layout/index.vue'),
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '', // 默认子路由
          name: '首页',
          component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
        },
        {
          path: '/role',
          name: '角色管理',
          component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue')
        },
        {
          path: '/menu',
          name: '菜单管理',
          component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue')
        },
        {
          path: '/resource',
          name: '资源管理',
          component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue')
        },
        {
          path: '/course',
          name: '课程管理',
          component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue')
        },
        {
          path: '/user',
          name: '用户管理',
          component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue')
        },
        {
          path: '/advert',
          name: '广告列表',
          component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue')
        },
        {
          path: '/advert-space',
          name: '广告位列表',
          component: () => import(/* webpackChunkName: 'advertspace' */ '@/views/advert-space/index.vue')
        }
      ]
    },
    {
      path: '*',
      name: '404',
      component: () => import(/* webpackChunkName: '404' */'@/views/error-page/404.vue')
    }

  ]
})


// 设置全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    // console.log(this)
    if (!store.state.user) {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
}) 

export default router