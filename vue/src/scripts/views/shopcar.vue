<template>
        <div class="shopcardiv">
            <div v-if="session">
                <div>
                    <mt-button type="primary" @click="loadshowdelete">管理</mt-button>
                </div>
                <div>
                        <ul v-for="(goods,i) in usershop.result" :key="i" class="usershopone clearfix">
                            <li class="shoplione">
                                <input type="checkbox" class="shopchildone" v-model="goods.check">
                            </li>
                            <li class="shoplitwo">
                                <img :src="goods.gsrc" alt="" class="shopchildone">
                            </li>
                            <li class="shoplithree">
                        
                                <p class="p1">{{goods.gname}}</p>
                                <p class="p2">{{goods.gtitle}}</p>
                                <p class="p3">颜色{{goods.gcolor}}</p>
                                <p class="p4">尺寸{{goods.gsize}}</p>
                                <span class="shopdelete" @click="shopdelete(goods)">-</span>
                                <span class="shopnum">{{goods.gnum}}</span>
                                <span class="shopadd" @click="shopadd(goods)">+</span>
                                <span class="">${{goods.gprice*goods.gnum}}(约¥{{goods.gprice*goods.gnum*6.4}})</span>
                            </li>
                            <li v-show="showdelete" class="shoplifour">
                               <mt-button type="primary" @click="changedelete(goods.uid)">删除</mt-button>
                            </li>
                        </ul>            
                </div>
                <div class="shopcarbottom">
                    <ul>
                        <li> <input type="checkbox" class="shopchildone" v-model="allcheck"></li>
                        <li>全选</li>
                        
                            <li>合计</li>
                            <li>¥{{allprice*6.4}}</li>
                            <li>(${{allprice}})</li>
                      
                        <li>
                            <mt-button type="primary" @click="allpay">结算</mt-button>
                        </li>
                    </ul>
                </div>
                
            </div>
            <div v-if="!session" class="noshopcarformeg">
                <p class="thisnoshopcar">您的购物车空空如也</p>
                 <mt-button type="primary" @click="gotofind">到处逛逛</mt-button>
                  <mt-button type="primary" @click="gotologin">登录</mt-button>
            </div>
        </div>

</template>
<script>
import {mapState,mapActions} from "vuex";
import router from "../router";
import axios from "axios";
export default {
    
    computed:{
        ...mapState([
            'session',
            'username',
            'usershop',
            'showdelete',
            'allcheck',
            'allprice'
        ]),
        allcheck:{
            get(){
                var flag  = true;  
                    for(var i in this.usershop.result){

                        if(! this.usershop.result[i].check){
                            flag = false;
                            }
                        }
                        return flag;
                },
            set(newVal){
                for(var i in this.usershop.result){

                         this.usershop.result[i].check=newVal;
                          
                        }
                      
            }
        },
        allprice:{
            get(){
                var totle=0;
                 for(var i in this.usershop.result){
                        if(this.usershop.result[i].check){
                            totle+=this.usershop.result[i].gnum*this.usershop.result[i].gprice;
                            }
                        }
                        return totle;
            },
            
        }
       
    },
    methods:{
        gotofind(){
            router.push({name:"find"});
        },
        gotologin(){
            router.push({name:"login"});
        },
        ...mapActions([
            'loadusershop',
            'changeshowdelete'
        ]),
        shopdelete(goods){
            console.log(goods);
            var uid=goods.uid;
            var gnum=goods.gnum;
            if(gnum>1){
                 console.log("=====-----------======")
                    var username=this.$store.state.username;
                var url="http://47.98.148.13:5000/users/usershopcontrol?uid="+uid+"&gnum="+gnum+"&control=delete";
                axios.get(url)
                .then(res=>res.data)
                .then(json=>{
                
                    this.loadusershop(username);
                });
            }
        
        },
        shopadd(goods){
            console.log(goods)
            var uid=goods.uid;
            var gnum=goods.gnum;
            var username=this.$store.state.username;
            var url="http://47.98.148.13:5000/users/usershopcontrol?uid="+uid+"&gnum="+gnum+"&control=add";
            axios.get(url)
            .then(res=>res.data)
            .then(json=>{
                
                this.loadusershop(username);
            });
        },
        loadshowdelete(){
            this.changeshowdelete(!this.$store.state.showdelete);
        },
        changedelete(uid){
             var username=this.$store.state.username;
            var url="http://47.98.148.13:5000/users/usershopdelete?uid="+uid+"&username="+username;
            
            axios.get(url)
              .then(res=>res.data)
            .then(json=>{
                console.log(json);
                this.loadusershop(username);
            });
        },
        allpay(){
              var username=this.$store.state.username;
             for(var i in this.usershop.result){
                        if(this.usershop.result[i].check){
                        var uid=this.usershop.result[i].uid;
                        var url="http://47.98.148.13:5000/users/usershopdelete?uid="+uid+"&username="+username;
                        axios.get(url)
                            .then(res=>res.data)
                            .then(json=>{
                                console.log(json.meg)
                                 this.loadusershop(username);
                        });
                }
            }
           
             
        }
        

    },
    mounted(){
        if(this.$store.state.session){
            var username=this.$store.state.username;
            this.loadusershop(username);
            console.log(this.$store.state.usershop);
        }
       
    },
    updated(){
        
    }
}
</script>
<style>

    .shopcardiv{
        margin-bottom: 200px;
        font-size: 24px;
       
    }
    .usershopone{
         padding: 0 4%;
        padding: 26px;
    }

    .shoplitwo img{
        width: 120px;
        height: 148px;
        vertical-align: middle;
         display: inline-block;
    }
    .shoplione{
        width: 10%;
        float: left;
        line-height: 300px;
        height: 300px;
        
    }
    .shoplitwo{
         width: 30%;
        float: left;
         line-height: 300px;
        height: 300px;
       
    
    }
    .shoplithree{
         width: 50%;
        float: left;

        height: 300px;
    
    }
    .shoplifour{
     width: 10%;
        float: left;
         line-height: 300px;
        height: 300px;
    
    }
    .shopdelete{
        width: 46px;
        height: 41px;
        border:1px solid #666;
        display: inline-block;
         text-align: center;
              line-height: 41px;
        
    }
     .shopadd{
        width: 46px;
        height: 41px;
        border:1px solid #666;
        display: inline-block;
         text-align: center;
         line-height: 41px;
       
    }
    .shopnum{
        width: 60px;
        height: 41px;
        border:1px solid #666;
        display: inline-block;
        text-align: center;
             line-height: 41px;
    }
    .p1{
        font-size: 22px;
        font-weight: bold;
        margin-top:50px;
    }
    .p2{
         font-size: 22px;
        font-weight: bold;
        color:#666;
    }
    .p3{
        font-size: 26px;
        color: #333;
    }
    .p4{
           font-size: 26px;
        color: #333;
    }
    .shopcarbottom{
        position: fixed;
        z-index: 10;
        bottom: 100px;
        width: 100%;
         height: 100px;
          background: #fff;
          line-height: 100px;
    }
    .shopcarbottom li{
        width: 10%;
        float: left;
       
       
    }
    .shopcarbottom button{
        width: 200px;
        height: 100px;
    }
    .shoplifour button{
        width: 60px;
        height: 120px;
        text-align: center;
    }
    .thisnoshopcar{
        font-size: 36px;
        font-weight: bold;
        text-align: center;
    }
    .noshopcarformeg{
        position: absolute;
        top: 30%;
        padding:0  4%;
        text-align: center;
    }
  
</style>
