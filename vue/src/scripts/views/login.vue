<template>
  
    <div>
        <div>
             <i class="iconfont" @click="gobackto()">&#xe641;</i>
             <span class="comelogin">登录</span>
        </div>
       
        <mt-field label="中国+86   " placeholder="手机号码" v-model="username"></mt-field>
        <mt-field  label="        " placeholder="密码" type="text" v-model="userpwd"></mt-field>
        
        <mt-button plain class="createbtn" @click="createuser">登录</mt-button>
      
    </div>
</template>


<script>
import {mapState,mapActions} from "vuex";
import axios from "axios";
import router from "../router";




export default {
    computed:{
        ...mapState([
            'options', 
            'username',
            'userpwd',
            'session'    
        ]),
        username:{
            get(){
                
            },
            set(value){
                this.$store.commit('createusername',value);
              
            }
        },
        userpwd:{
              get(){
                
            },
            set(value){
                this.$store.commit('createuserpwd',value)
            }
        }
    },
    methods:{
        createuser(){
        var url="http://47.98.148.13:5000/users/login?username="+this.$store.state.username+"&userpwd="+this.$store.state.userpwd;
          axios.get(url)
          .then(res=>res.data)
        .then(json=>{
            console.log(json);
            console.log(this);
            if(json.code==0){
                console.log(json.username)
               
               router.go(-1);
               this.$store.commit('changesession',true);
               this.$store.commit('loadusername',json.username);
            }
        })
        },
         gobackto(){
            router.go(-1);
        }
    }
   
}
</script>

<style scoped>
    .createbtn{
        width: 80%;
        height: 85px;
        margin-left:10%;
    }
    .comelogin{
        font-size: 40px;
        font-weight: bold;
        padding: 0 5%;
    }
</style>

 