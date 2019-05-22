// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import ('dplayer/dist/Dplayer.min.css')
import axios from 'axios'
import VideoPlayer from 'vue-video-player'
import Mint from 'mint-ui' // mint-ui模块,滚动加载
import 'mint-ui/lib/style.css'
import './mock/index'
import './assets/index.css'
Vue.use(VideoPlayer)
Vue.use(Mint)
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
