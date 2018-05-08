console.log("begin");


import Vue from "vue";  
import VueResource from "vue-resource";
Vue.use(VueResource); // 全局 使用 this.$http
import axios from "axios";


import router from "./router";

import Mint from 'mint-ui';

import store from "./vuex/store";
Vue.use(Mint);



const exp=new Vue({
    router,
    store,
}).$mount("#exp");