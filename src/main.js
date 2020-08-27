import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/global.css'
import axios from 'axios'
import vuescroll from 'vuescroll'
import VideoPlayer from 'vue-video-player'
import vshare from 'vshare' // 分享组件
import ViewUI from 'view-design' // ui组件
import 'view-design/dist/styles/iview.css' // ui组件

import './assets/icon/font_1/iconfont.css'
import './assets/icon/font_1/iconfont.js'

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.prototype.$axios = axios
axios.defaults.baseURL = '/foo'
// axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.localStorage.getItem('access_token')
  // config.headers.refresh_token = window.localStorage.getItem('refresh_token')
  return config
})

Vue.use(vuescroll)
Vue.use(VideoPlayer)
Vue.use(ViewUI) // ui组件
Vue.use(vshare) // 分享组件

Vue.prototype.$vuescrollConfig = {
  bar: {
    background: '#cecece',
    minSize: 0.2,
    opacity: 0.8,
    specifyBorderRadius: '5px',
    onlyShowBarOnScroll: false
  }
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
