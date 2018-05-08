<template>
  <div class="thishotdiv">
    <mt-navbar v-model="selected">
    <mt-tab-item :id="i" v-for="(itm,i) in artic" :key="i">{{itm.title}}</mt-tab-item>
    </mt-navbar>

<!-- tab-container -->
    <mt-tab-container v-model="selected">
    <mt-tab-container-item :id="i" v-for="(itm,i) in artic" :key="i">
        <mt-swipe :auto="3000" class="hotswiper">
            <mt-swipe-item v-for="(img,n) in itm.banner" :key="n">
              <img :src="img" alt="">
              
            </mt-swipe-item>
        </mt-swipe>

        <ul class="showartic">
            <li v-for="(art,i) in itm.artics" :key="i" :id="art.aid" class="clearfix" @click="gotoone(art.aid)">
                <img :src="art.artimg" alt="">
                <p class="p1">{{art.arttime}}</p>
                <p class="p1">{{art.artname}}</p>
                <p class="p1">{{art.artauthor}}推荐</p>
            </li>
        </ul>
      
    </mt-tab-container-item>
    </mt-tab-container>


  </div>

</template>
<script>
import {mapState,mapActions} from "vuex";
import axios from "axios";
import router from '../router';

export default {
  data(){
      return {
            selected:0
      }
    
  },
  computed:{
      ...mapState([
          'artic'
      ]),
  },
  methods:{
     gotoone(aid){
        router.push({name:"articone",params:{aid:aid}})
     }
  },
  mounted(){
      let url="http://47.98.148.13:5000/users/loadhot";
      axios.get(url)
        .then(res=>res.data)
        .then(json=>{
             this.$store.commit("loadhot",json)
        })
  
  }
}
</script>
<style>
    .hotswiper{
        height: 330px;
       
    }
    .hotswiper img{
        width: 100%;
        height: 100%;
    }
    .showartic{
         margin-top:10px;
        border-top:1px solid #f1f1f1;
    }
    .showartic li{
        font-size: 26px;
        height: 330px;
        border: 1px solid #f1f1f1;
    }
    .showartic img{
        width: 50%;
        height: 100%;
        float: left;
    }
    .showartic p{
        display: block;
       text-align: right;
    }
    .p1{
        font-weight: bold;
        padding:20px 20px;
    }
    .p2{
        font-size: 36px;
        font-weight: bold;
    }
    .p3{
        font-size: 24px;
    }
    .thishotdiv{
        padding-bottom: 110px;
    }
</style>
