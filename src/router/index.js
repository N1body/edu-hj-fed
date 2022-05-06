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
        },
        {
          path: '/role/:roleId/alloc-menu',
          name: 'allocMenu',
          component: () => import(/* webpackChunkName: 'allocmenu' */ '@/views/role/components/alloc-menu.vue'),
          meta: {
            title: '分配菜单'
          },
          // 第一种传递 params 参数的方法
          props ({params: {roleId}}) {
            return {roleId}
          }
        },
        {
          path: '/role/:roleId/alloc-resource',
          name: 'allocResource',
          component: () => import(/* webpackChunkName: 'allocresource' */ '@/views/role/components/alloc-resource.vue'),
          meta: {
            title: '分配资源'
          },
          // 第二种传递 params 参数的方法
          props: true
        },
        {
          path: '/menu/:menuId/edit',
          name: 'editMenu',
          component: () => import(/* webpackChunkName: 'editmenu' */ '@/views/menu/Edit.vue'),
          meta: {
            title: '编辑菜单'
          },
          // 第二种传递 params 参数的方法
          props: true
        },
        {
          path: '/menu/create',
          name: 'createMenu',
          component: () => import(/* webpackChunkName: 'createmenu' */ '@/views/menu/Create.vue'),
          meta: {
            title: '添加菜单'
          }
        },
        {
          path: '/resource/category',
          name: 'resourceCategory',
          component: () => import(/* webpackChunkName: 'resourceCategory' */ '@/views/resource/components/Category.vue'),
          meta: {
            title: '资源分类'
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