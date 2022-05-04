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
          name: 'index',
          component: () => import(/* webpackChunkName: 'home' */ '@/views/course/index.vue'),
          meta: {
            title: '课程管理'
          }
        },
        {
          path: '/role',
          name: 'role',
          component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue'),
          meta: {
            title: '角色管理'
          }
        },
        {
          path: '/menu',
          name: 'menu',
          component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue'),
          meta: {
            title: '菜单管理'
          }
        },
        {
          path: '/resource',
          name: 'resource',
          component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue'),
          meta: {
            title: '资源管理'
          }
        },
        {
          path: '/course',
          name: 'course',
          component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue'),
          meta: {
            title: '课程管理'
          }
        },
        {
          path: '/user',
          name: 'user',
          component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue'),
          meta: {
            title: '用户管理'
          }
        },
        {
          path: '/advert',
          name: 'advert',
          component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue'),
          meta: {
            title: '广告列表'
          }
        },
        {
          path: '/advert-space',
          name: 'advert-space',
          component: () => import(/* webpackChunkName: 'advertspace' */ '@/views/advert-space/index.vue'),
          meta: {
            title: '广告位列表'
          }
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

// router.afterEach(to => {
//   // console.log('afterEach', to, from)
//   console.log(to.matched[1])
// })

export default router