import Vue from 'vue'
import VueRouter from 'vue-router'
// 主页
import uindex from '../views/index/index_u.vue'
import sindex from '../views/index/index_s.vue'
import tindex from '../views/index/index_t.vue'
import aindex from '../views/index/index_a.vue'
// 学生
// 教师
// 管理员

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/uindex'
  },
  // 主页
  {
    path: '/uindex',
    component: uindex
  },
  {
    path: '/sindex',
    component: sindex
  },
  {
    path: '/tindex',
    component: tindex
  },
  {
    path: '/aindex',
    component: aindex
  }
  // 学生
  // 教师
  // 管理员
]

const router = new VueRouter({
  routes
})

export default router
