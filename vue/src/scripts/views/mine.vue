<template>
  <div class="minealldiv">
      <div class="minehead" >
          <div>
            <img src="http://47.98.148.13/images/userimg.jpg" alt="" class="userimg">
            <div class="formeg" v-if="!session">
                <router-link :to="{name:'create'}">注册</router-link>
                <span>/</span>
                <router-link :to="{name:'login'}">登录</router-link>
            </div>
             <div class="formeg" v-if="session">
                
                <router-link :to="{name:'userinfo'}">{{username}}</router-link>

                <router-link to="">积分</router-link>
                 <span class="forquite" @click="forquite">退出</span>
            </div>
            
          </div>  
      </div>
      <div class="middle">
          <ul class="clearfix middlehead">
              <li>
                  <img src="http://47.98.148.13/images/shoucang.jpg" alt="">
                  <p> 收藏</p>   
                 
                  </li>
              <li>
                  <img src="http://47.98.148.13/images/zuji.jpg" alt="">
                  <p>浏览记录</p>   
                  </li>
              <li>
                  <img src="http://47.98.148.13/images/youhui.jpg" alt="">
                  <p>领取代金券</p>   
                  </li>
          </ul>
          <div class="clearfix middlemiddle">
              <span class="left">我的订单</span>
              <span class="right">查看全部订单</span>
          </div>
          <ul class="clearfix middlefoot">
              <li>
                  <img src="http://47.98.148.13/images/dfk.jpg" alt="">
                  <p>待付款</p>
                  </li>
              <li>
                  <img src="http://47.98.148.13/images/dfh.jpg" alt="">
                  <p>待发货</p>
                  
                  </li>
              <li>
                   <img src="http://47.98.148.13/images/dsh.jpg" alt="">
                  <p>待收货</p>
                  
                  </li>
              <li>
                   <img src="http://47.98.148.13/images/yqs.jpg" alt="">
                  <p>已签收</p>
                  
                  </li>
              <li>
                   <img src="http://47.98.148.13/images/yqx.jpg" alt="">
                  <p>已取消</p>
                  
                  </li>
          </ul>
      </div>
      <div class="minead">
          <img src="http://47.98.148.13/images/minead.jpg" alt="">
      </div>
      <div class="minefoot">
          <dl>
              <dd class="minefootdd">
                    <img src="http://47.98.148.13/images/haoyou.jpg" alt="">
                    <span>邀请好友获得代金券</span>
             </dd>
              <dd class="minefootdd">  <img src="http://47.98.148.13/images/kefu.jpg" alt="">
                    <span>联系客服</span></dd>
              <dd class="minefootdd">  <img src="http://47.98.148.13/images/bangzhu.jpg" alt="">
                    <span>帮助文档</span></dd>
              <dd class="minefootdd">  <img src="http://47.98.148.13/images/fenxiang.jpg" alt="">
                    <span>分享别样</span></dd>
              <dd class="minefootdd">  <img src="http://47.98.148.13/images/guanyu.jpg" alt="">
                    <span>关于别样</span></dd>
          </dl>
      </div>
    
  </div>
</template>

<script>

import Foot from "../components/foot.vue";
import {mapState,mapActions} from "vuex";


 
export default {
        computed:{
            ...mapState([
                'session',
                'username'
            ])
        },
        components:{
            Foot
        },
        methods:{
            forquite(){
                this.$store.commit('forquite',"");
            }
        }
}
</script>

<style scoped>
    .minehead{
        width: 100%;
        height: 250px;
        background: rgb(247,247,247);
        font-size: 26px;
        line-height: 250px;
    }
    .userimg{
            width: 125px;
            height: 126px;
            display: inline-block;
            vertical-align: middle;
            margin-left:5%;
            margin-right:5%;
        }
    .middle{
        margin-top:50px;
        font-size: 26px;
        margin:5% 5%;
    }
    .middlehead li{
        width: 33%;
        float: left;
        text-align: center;
    }
    .middle img{
        width: 50px;
        height: 50px;
        display: inline-block;
    }
    .left{
        float: left;
    }
    .right{
        float: right;
    }
    .middlemiddle{
        margin:10% 0;
    }
    .middlefoot li{
        width: 20%;
        float: left;
        text-align: center;
    }
    .middlefoot img{
        width: 42px;
        height: 36px;
    }
    .minead{
        height: 184px;
    }
    .minead img{
        height: 184px;
    }
    .minefootdd{
        height: 80px;
        font-size: 26px;
        margin: 0 5%;
         text-align: left;
         line-height: 80px;
        border-bottom: 1px solid #f1f1f1;
    }
    .minefootdd img{
        display: inline-block;
        width: 37px;
        height: 40px;
        vertical-align: middle;  
        padding-right: 5%;
    }
     .minefootdd span{
         display: inline-block;
         vertical-align: middle;
     }
     .formeg{
         display: inline-block;
         
     }
     .formeg a{
         color: #333;
     }
     .minealldiv{
         margin-bottom: 110px;
     }
    
</style>


