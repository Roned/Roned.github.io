<template>
    <div class="goodsone">
        <div class="goodsonediv">
            <div class="goodsonehead">
                <div class="thisoneimg">
                    <div class="thisicontitle">
                         <i class="iconfont back" @click="gobackto()">&#xe641;</i>
                        <span>商品详情</span>
                    </div>
                   
                     <img :src="goodsone.gsrc" alt="" class="forthisimg">
                </div>
               
                <p class="goodsheadpone">{{goodsone.gname}}</p>
                <p class="goodsheadptwo">{{goodsone.gtitle}}</p>
                <p class="goodsheadpthree">${{goodsone.gprice}}(约¥{{goodsone.gprice*6.4}})</p>
            </div>
            <div>
                <p class="totlelead">[颜色]</p>
                <ul class="clearfix colorselectul">
                    <li class="colorselect" v-for="(color,i) in goodsone.gcolor" :key="i" :style="{background:color}" @click="selectcolor(color,$event)"></li>
                </ul>
                <p class="totlelead">[尺寸]</p>
                <ul class="clearfix sizeselectul">
                    <li class="sizeselect" v-for="(size,i) in goodsone.gsize" :key="i" @click="selectsize(size,$event)">
                        {{size}}
                    </li>
                </ul>
                <p class="goodsonenum totlelead">[数量]</p>
                <p class="goodsnownum">{{goodsone.gnum}}</p>
            </div>
           
           
        </div>
         <div class="buygoodsone">
                <mt-button type="primary" @click="gotoshopcar">我的购物车</mt-button>
                <mt-button type="primary" @click="buygoodsone">加入购物车</mt-button>
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
            'goodsone',
            'goodsonecolor',
            'goodsonesize',
            'username',
             'session'
        ])
    },
    methods:{
        ...mapActions([
            'loadgoodsone',
            'changecolor',
            'changesize',
           
        ]),
        gotoshopcar(){
            router.push({name:"shopcar"});
        },
        selectcolor(color,$event){
            console.log($event);
            
            var list=[];
            list=document.getElementsByClassName("colorselect");
            for(var i=0;i<list.length;i++){
               list[i].style.border="2px solid #fff";
           }
            $event.target.style.border="2px solid #333";
            this.changecolor(color);
        },
        selectsize(size, $event){
           
            var list=[];
            list=document.getElementsByClassName("sizeselect");
            for(var i=0;i<list.length;i++){
               list[i].style.color="#999";
            
           }
            $event.target.style.color="#e13334";
          
             this.changesize(size);
        },                                      
        buygoodsone(){
            if(this.$store.state.session){
                var gsize=this.$store.state.goodsonesize;
                var gcolor=this.$store.state.goodsonecolor;
                console.log(this.$store.state.goodsonecolor)
                var gid=this.$store.state.goodsone.gid;
                var gsrc=this.$store.state.goodsone.gsrc;
                var gprice=this.$store.state.goodsone.gprice;
                var username=this.$store.state.username;
                var gname=this.$store.state.goodsone.gname;
                var gtitle=this.$store.state.goodsone.gtitle;
            var url="http://47.98.148.13:5000/users/userbuy?username="+username+"&gid="+gid+"&gprice="+gprice+"&gsize="+gsize+"&gcolor="+gcolor+"&gsrc="+gsrc+"&gtitle="+gtitle+"&gname="+gname;

             axios.get(url)
                .then(res=>res.data)
                .then(json=>{
                    console.log(json);
                })
            }else{
                router.push({name:"login"});
            }
           
        },
        gobackto(){
            router.go(-1);
        }
    },
    mounted(){
         console.log(this.$route.params);
        var gid=this.$route.params.gid;
       
        var url="http://47.98.148.13:5000/users/loadgoodsone?gid="+gid;
        this.loadgoodsone(url);
    }
}
</script>
<style>

    .goodsheadpone{
        font-size: 28px;
        font-weight: bold;
    }
    .goodsheadptwo{
        font-size: 20px;
        font-weight: bold;
        color: #666;
    }
    .goodsheadpthree{
          font-size: 26px;
        font-weight: bold;
    }
    .goodsonediv{
        padding: 0 4%;
        margin-bottom: 100px;
    }
    .colorselect{
        width: 78px;
        height: 78px;
        float: left;
        margin:5% 5%;
        border:4px solid #fff;
    }  
    .goodsone{
        font-size: 24px;
    }
    .sizeselect{
        border:2px solid #999;
        float: left;
        box-sizing: border-box;
        width: 30%;
        height: 68px;
        text-align: center;
        font-size: 22px;
        font-weight: 300;
        color: #999;
        line-height: 68px;
        margin-right: 5%;
        margin-top:5%;
    }
    .sizeselectul :nth-child(3n){
        margin-right: 0;
    }
    .goodsonehead{
        height: 850px;
    }
    .goodsonenum{
        margin-top:5%;
    }
    .buygoodsone{
        height: 100px;
        position:fixed;
        bottom: 0;
    }
    .totlelead{
        font-size: 28px;
        font-weight: bold;
    }
    .goodsnownum{
        padding: 5% 0;
        color: red;
        font-size: 36px;
        font-weight: 300;
    }
    .thisoneimg{
        text-align: center;
    }
    .forthisimg{
        width: 100%;
        height: 660px;
    }
    .back{
        float: left;
    }
    .thisicontitle{
        height: 60px;
        line-height: 60px;
    }
    .thisicontitle span{
        font-size: 30px;
        font-weight: bold;
    }
</style>

