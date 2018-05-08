<template>
  <div>
    <Head/>
      <ul>
        <li class="cellstyle comehere">
            <mt-cell title="账号">
                <span>{{username}}</span> 
            </mt-cell>
        </li>
        <li class="cellstyle">
            <mt-cell title="修改密码" is-link >          
            </mt-cell>
        </li>
        <li class="cellstyle"> 
            <mt-cell title="头像"  is-link>
                <img src="" alt="">
            </mt-cell>
        </li>
        <li class="cellstyle"> 
            <mt-cell title="昵称"  is-link>
                <span>点击设置昵称</span>
            </mt-cell>
        </li>
        <li class="cellstyle" @click="sheetVisible=!sheetVisible"> 
            <mt-cell title="性别"  is-link>
                <mt-actionsheet
                :actions="actions"
                v-model="sheetVisible"
                 :closeOnClickModal="closeOnClickModal"
                >
               
                </mt-actionsheet>
            </mt-cell>
           
        </li>
        <li class="cellstyle">
            <mt-cell title="出生年份"  is-link>

            </mt-cell>
        </li>
        <li class="cellstyle"> 
            <mt-cell title="生日"  is-link>

            </mt-cell>
        </li>
        <li class="cellstyle">
            <mt-cell title="币种"  is-link>
                <span>人民币</span>
            </mt-cell>
        </li>
        <li class="cellstyle">
            <mt-cell title="收货地址"  is-link>

            </mt-cell>
        </li>
        <li class="cellstyle"> 
            <mt-cell title="我的晒单"  is-link>
            </mt-cell>
        </li>
        <li class="cellstyle">
            <mt-cell title="支付身份证信息"  is-link>
            </mt-cell>
        </li>
      </ul>
    
  </div>
</template>


<script>

import {mapState,mapActions} from "vuex";
import Head from "../components/head.vue";
import axios from "axios";


export default {
    data(){
        return {
            sheetVisible:false,
            actions:[
                {name:"男",method:function(){}},
                {name:"女",method:function(){
                   
                }}
            ],
           closeOnClickModal:false
        }
    },
    computed:{
        ...mapState([
            'username',
        ])
    },
    methods:{
       get(){
           alert("aaa")
       }
    },
    components:{
        Head
    },
    mounted(){
        console.log(this);
        let username=this.username;
        let url="http://47.98.148.13:5000/users/changeuser?username="+username+"&sex='女'"
        this._data.actions[0].method=function(){
                    console.log(this);
                    axios.get(url)
                    .then(res=>res.data)
                    .then(json=>{
                        console.log(json);    
                    })
                   
                }
    }
}
</script>
<style>
    .cellstyle{

        padding: 5px 0;
        
    }
    .comehere{
        padding-top:10px; 
    }
   
</style>
