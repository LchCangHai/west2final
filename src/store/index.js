import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 主页
    showPop01: false, // 未登录主页弹窗是否打开
    popType01: 1, // 未登录主页弹窗类型
    // 学生
    // 教师
    // 管理员
    // 当前登录的用户信息
    isSignup: false,
    currentUser: {}
    // 当前选择的课程信息
    // 当前正在发布的作业信息
  },
  mutations: {
    // 主页
    openPop01 (state) {
      state.showPop01 = true
    },
    closePop01 (state) {
      state.showPop01 = false
      state.popType01 = 1
    },
    changePopType01 (state, type) {
      state.popType01 = type
    },
    // 学生
    // 教师
    // 管理员
    // 当前登录的用户信息
    setisSignup (state, status) {
      state.isSignup = status
    },
    setcurrentUser (state, info) {
      state.currentUser = info
    }
    // 当前选择的课程信息
    // 当前正在发布的作业信息
  },
  actions: {
    // 主页
    // 学生
    // 教师
    // 管理员
  },
  modules: {
  }
})
