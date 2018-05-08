<template>
    <div>
        <div class="articonehead">
            <i class="iconfont" @click="gobackto()">&#xe641;</i>
            <span class="articonetitle">{{articone.artictitle}}</span>
            <img :src="articoneauthor.artimg" alt="">
            <p class="artauthor">{{articoneauthor.artauthor}}推荐</p>
        </div>
        <div class="articonediv">
            <p v-for="(itm,i) in articone.artictext" :key="i" class="formeg">
                {{itm}}
            </p>
            <ul class="clearfix articoneul">
                <li v-for="(pic,i) in articone.articimgs" class="forimg" :key="i">
                    <img :src="pic" alt="">
                </li>
            </ul>
         </div>
         <div class="articonereply">
             <div>
                 <span class="pinglun">最新评论</span>
             </div>
             <div>
                 <ul>
                     <li v-for="(txt,i) in relist" :key="i" class="replyli">
                         <p>{{txt.list.name}}</p>
                         <p>{{txt.list.time}}</p>
                         <p>{{txt.list.message}}</p>
                     </li>
                 </ul>
             </div>
         </div>
         <div class="articonefoot">
             <input type="text" name="" id="thisreplyinput" v-model="replymessage">
             <mt-button type="primary" @click="getreply">发表</mt-button>
         </div>
    </div>
  
</template>
<script>
import {mapState,mapActions} from "vuex";
import router from '../router';
import {MessageBox} from 'mint-ui';




export default {
    
    computed:{
      
        ...mapState([
            'articone',
            'articoneauthor',
            'username',
            'relist'
        ]),
         replymessage:{
            get(){
                
            },
            set(value){
                this.$store.commit('changereplymessage',value)
            }
        },
    },
    methods:{
          ...mapActions([
            'toarticone',
            'replylist',
            'loadreplylist',
            'session'
        ]),

        getreply(){
            var aid=this.$route.params.aid;
         
            var username=this.$store.state.username;

            var session=this.$store.state.session;
           
             var url="http://47.98.148.13:5000/users/loadreply?aid="+aid+"&username="+username+"&message="+this.$store.state.replymessage;
            if(session){
                this.replylist(url);
            }else{
               MessageBox({
                   confirmButtonText:"去登陆",
                   cancelButtonText:"再看看",
                   message:"登录才可评论",
                   showConfirmButton:true,
                   showCancelButton:true,
               }).then(action => {
                    router.push({name:"login"});
                    });
            }
            
        },
        gobackto(){
            router.go(-1);
        }
    },
    mounted(){
        // console.log(this)
       
        // console.log("00000000000000")
        // console.log(this)
        var aid=this.$route.params.aid;
        console.log(this.$store.state.relist)
        console.log(aid)
        var url="http://47.98.148.13:5000/users/loadarticone?aid="+aid;
        var url1="http://47.98.148.13:5000/users/loadoldreply?aid="+aid;
        this.toarticone(url);
        this.loadreplylist(url1);
    }

}
</script>
<style>
    .articonediv{
        padding: 0 5%;
    }
    .formeg{
        font-size: 26px;
        font-weight: 300;
        margin:5% 0;
    }
    .forimg{
        width: 298px;
        height: 436px;
        float: left;
       box-shadow: 2px 2px 2px 2px #888888;
       margin-top: 20px;
       margin-right: 70px;
    }
    .forimg img{
        width:100%;
        height: 100%;
    }
    .articoneul :nth-child(2n){
        margin-right: 0;
    }
    .articonetitle{
        font-size: 34px;
        font-weight: bold;
        text-align: center;
    }
    .articonehead img{
        margin: 5% 0;
        width:100%;
        height: 300px;
    }
    .artauthor{
        font-size: 26px;
        font-weight: bold;
        text-align: center;
    }
    .replyli{
        font-size: 24px;
        padding: 2% 5%;
    }
    .pinglun{
        font-size: 30px;
        font-weight: bold;
        text-align: center;
    }
    #thisreplyinput{
        outline: none;
        border: 1px solid #333;
        height: 70px;
    }
    .articonereply{
          padding: 0 5%;
    }
    .articonefoot{
         padding: 0 5%;
    }
</style>


