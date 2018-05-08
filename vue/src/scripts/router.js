import Vue from "vue";
import VueRouter from "vue-router";

// 0 
Vue.use(VueRouter);

//1路由组件

import Mine from "./views/mine.vue";
import Create from "./views/create.vue";
import Login from "./views/login.vue";
import Userinfo from './views/userinfo.vue';
import Index from './components/index.vue';
import Find from './views/find.vue';
import Hot from './views/Hot.vue';
import Shopcar from './views/shopcar.vue';
import Shop from './views/shop.vue';
import Articone from './views/articone.vue';
import Goodsone from './views/goodsone.vue';
const routes=[
    {path:"/index",component:Index,name:"index",
    children:[
        {path:"mine",component:Mine,name:"mine"},
        {path:"find",component:Find,name:"find"},
        {path:"shopcar",component:Shopcar,name:"shopcar"},
        {path:"hot",component:Hot,name:"hot"},
        {path:"shop",component:Shop,name:"shop"},
        {path:"*",redirect:"/index/hot"},
    ]
},  
    {path:"/userinfo",component:Userinfo,name:"userinfo"},
    {path:"/create",component:Create,name:"create"},
    {path:"/login",component:Login,name:"login"},
    {path:"/articone/:aid",component:Articone,name:"articone"},
    {path:"/goodsone/:gid",component:Goodsone,name:"goodsone"},
    {path:"*",redirect:"/index/hot"},
    
];

var router=new VueRouter({
    routes,
    mode:"hash"
});

export default router;

