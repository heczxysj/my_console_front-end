import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入登录组件
import Login from '../components/Login'
import Home from '../components/Home'
import Welcome from '@/components/Welcome'
import Users from '@/components/admin/Users'
import Rights from '@/components/admin/Rights'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/admin/users',
        component: Users
      },
      {
        path: '/admin/rights',
        component: Rights
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

/*
挂在路由导航守卫
to：将要访问的路径
from：从哪个路径转过来
next：是一个函数 表示放行
next()：放行   next('/login')：强制跳转
 */
router.beforeEach(function (to, from, next) {
  if (to.path === '/login') return next()
  // 获取session
  const userid = window.sessionStorage.getItem('userid')
  if (!userid) return next('/login')
  next()
})

export default router
