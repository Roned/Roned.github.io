<template>
  <div class="section goodslistdiv" v-if="show">
      <Head title="首页" />
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul id="list" class="clearfix goodslistul"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
        >
            <li v-for="(goods,index) in goodslist" :key="index" class="goodslistli" @click="gotogoodsone(goods.gid)">
               <img :src="goods.gsrc" alt="">
               <p class="goodsspanone">{{goods.gname}}</p>
               <p class="goodsspantwo">{{goods.gtitle}}</p>
               <p class="goodsspanthree">${{goods.gprice}}</p>
               <p class="goodsspanfour">¥{{goods.gprice*6.4}}</p>

            </li>
        </ul>
      </mt-loadmore>
      
  </div>
</template>

<script>
import { Indicator,Toast ,Loadmore,InfiniteScroll  } from 'mint-ui';
import {mapState,mapActions} from "vuex";
import router from "../router";

export default {
  data(){
      return {
          goodslist:[],
          show:false,
          allLoaded:true,
          loading:false,
          pageindex:1
      }
  },
  computed:{
      ...mapState([

      ])
  },
  methods:{
      ...mapActions([
          'loadgoods'
      ]),
      gotogoodsone(gid){
          router.push({name:"goodsone",params:{gid:gid}});
      },
      loadTop(){
        console.log("top-滑动顶部-下拉刷新");
        this.$http.get("http://47.98.148.13:5000/users/loadgoods")
            .then(res=>{
                setTimeout(()=>{
                    this.goodslist = res.body.result;
                    this.$refs.loadmore.onTopLoaded();  // 通知vue 我已经刷新成功
                },1500)
            })
      },
      loadBottom(){
          console.log("bottom-滑动底部-上拉加载更多");

        //   请求数据 
      },
      loadMore(){
          console.log("__________")
          console.log("loadmore");
           this.pageindex++
          if(this.pageindex<=5){
               this.loading = true;
             this.$http.get("http://47.98.148.13:5000/users/loadgoods",{
                params:{
                    pageindex:this.pageindex
                }
        })
            .then(res=>{
               
                setTimeout(()=>{
                    console.log(res);
                      this.goodslist = this.goodslist.concat(res.body.result);
                      this.loading = false;
                       Toast({
                            message: '请求成功',
                            iconClass: 'iconfont icon-fanhuidingbu',
                            duration:1000,
                        });
                },1500)
            })
          }else{
              Toast({
                            message: '已经没有更多了',
                            iconClass: 'iconfont icon-fanhuidingbu',
                            duration:1000,
                        });
          }
         
      },
     
  },
  beforeRouteEnter (to, from, next) {
      next()
  },
  beforeRouteUpdate (to, from, next) {
      next()
  },
  beforeRouteLeave (to, from, next) {
      next()
  },
  components:{
      
  },
  mounted(){
    //   正在加载中...
    Indicator.open({
        text: '加载中...',
        spinnerType: 'triple-bounce'
    });

    this.$http.get("http://47.98.148.13:5000/users/loadgoods",{
         params:{
               pageindex:1
        }
    })
        .then(res=>{
            console.log(res);
            setTimeout(()=>{
                Indicator.close();
                this.show = true;
                this.goodslist = res.body.result;
               
                Toast({
                    message: '请求成功',
                    iconClass: 'iconfont icon-fanhuidingbu',
                    duration:500,
                });
            },0);
        })
  }
}
</script>

<style scoped>
.mint-loadmore-content{
    padding-bottom: 150px !important
}
.goodslistul{
    padding:0 2%;
}

.goodslistli{
    width: 49%;
    height: 720px;
    float: left;
}
.goodslistli img{
    width: 100%;
    height: 500px;
}
.goodslistul :nth-child(2n-1){
    margin-right: 2%;
}
.goodsspanone{
    font-size: 26px;
    font-weight: bold;
}
.goodsspantwo{
    font-size: 26px;
    font-weight: bold;
    color: #666;
}
.goodsspanthree{
     font-size: 26px;
    font-weight: bold;
}
.goodsspanfour{
     font-size: 26px;
    font-weight: bold;
}
.goodslistdiv{
    font-size: 30px;
    font-size: 300;
    margin-bottom: 110px;
}
</style>
