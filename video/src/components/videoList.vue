<template>
    <!-- <div class="video-player-child"> 
      <div class="swiper-container" :style="[height]">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in array" :key="index" >
            <div class="video-card" :style="[width]">
              <video-player  :ref="'videoPlayer'+index" @play="handlePlay" :videoData="item.knowledgeInfo"></video-player>
              <div class="black-cover"></div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div> 
    <div href="" @click="goBack">返回</div>
      <div v-for="(item,index) in array" :key="index">
         <!-- <div class="video-card" :style="[width]" @touchend.stop="isPlaying(index)">
            <video-player @changeIndex="changeIndex"  :ref="'videoPlayer'+index" :selfIndex="index"  :startIndex="2" @play="handlePlay" :videoData="item.knowledgeInfo"></video-player>
            <div class="black-cover"></div>
        </div> -->
        <dplayer :videoIndex="index"></dplayer>
      </div>
    </div>
</template>
<script>
/* eslint-disable */

import $ from 'jquery'
import Swiper from '../../static/swiper.min.js'
import VideoPlayer from './video'
import Dplayer from './video1'
import  classcontrolAddService from '../../api/load'
export default {
  name: 'videoPlayerList',
  data () {
    return {
      array:[],
      swiper:{},
      mySwiper:null,
      playIndex:0,
      clickIndex:0,
      height:{},
      parent:{},
      child:{},
      width:{},
      firstLoad:false
    }
  },
  components:{
    VideoPlayer,
    Dplayer
  },
  watch: {
    array(){
    }
  },
  beforeCreate(){
  },
  created () {
    console.log(this.$route.query.id)
    console.log(this.array)
    console.log( $('.video-player-child'))
  //  this.array = [
  //    1,2,3,4,5,6,7,8
  //  ]
  // classcontrolAddService.loadAll().then(res=>{
  //   console.log(res)
  this.$http.post('/loadList').then(res=>{
    console.log(res)
    // this.array = res.data.res.datas
    this.array = [1]
    // this.$nextTick(()=>{
    //   this.createSwiper()
    // })
  })
    // $('.video-player-child').css({
    //   width:$('body').width(),
    //   height:$('body').height()
    // })
    // this.getAllList()
  },
  beforeMount(){
   
  },
  mounted(){
    $('.video-player-child').css({
      'width':$('body').width()+'px',
      'height':$('body').height()+'px',
      'background-color':'#000'
    })
    // 设置偏移量，居中播放
    // 16:9 播放模式  获取高度
    let cardHeight = ($('body').width()/16)*9 + 90
    // （页面高度-播放器高度）/2 获得偏移量 
    let minHeight = ($('body').height()-cardHeight)/2
    this.height = {
      'position':'absolute',
      'top':minHeight+'px',
      'width':$('body').width()+'px'
    } 
    // this.createSwiper()
  },
  beforeUpdate () {
  
  },
 
  updated(){
  },
  methods: {
    changeIndex(data){
      this.playIndex = data
    },
    isPlaying(index){
      console.log('333333')
      console.log(this.$refs['videoPlayer'+this.playIndex][0].player)
      if(index === this.playIndex){
        if(this.$refs['videoPlayer'+this.playIndex][0].isPlaying){
            this.$refs['videoPlayer'+index][0].player.pause()
        }else{
            this.$refs['videoPlayer'+index][0].player.play()
        }
      }else{
          this.$refs['videoPlayer'+this.playIndex][0].player.pause()
          this.$refs['videoPlayer'+index][0].player.play()
      }
    },
    goBack(){
      this.$router.push({path:'/'})
    },
     getAllList () {
    //     this.$nextTick(()=>{
    //       this.createSwiper()
    //     })
    },
    scrollPlay(){
     
    },
    handlePlay(){

    },
    startVideo(index){
      console.log('点击了')
      // 把上一个正在播放的关掉
      if(!this.$refs['videoPlayer'+this.playIndex][0].isPlaying){
        this.$refs['videoPlayer'+this.playIndex][0].stopVideo()
      }
      this.$refs['videoPlayer'+this.playIndex][0].showReply = false

      // 点击的播放

      if(!this.$refs['videoPlayer'+index][0].isPlaying){
        this.$refs['videoPlayer'+index][0].startVideo()
      }
      //         console.log(this.$refs['videoPlayer'+index][0])
      // 将现在的index 变成正在播放的index
      this.playIndex = index
      //  for(let k=0;k<this.array.length;k++){
      //       if(k === index){
      //         if(!this.$refs['videoPlayer'+index][0].isPlaying){
      //           this.$refs['videoPlayer'+index][0].startVideo()
      //         }
      //         console.log(this.$refs['videoPlayer'+index][0])
      //       }else{
      //          // 销毁生成的回复框
      //           if(this.$refs['videoPlayer'+index][0].isPlaying){
      //             this.$refs['videoPlayer'+k][0].stopVideo()
      //             this.$refs['videoPlayer'+k][0].showReply = false
      //           }
      //       }
      //   }
      $('.black-cover').show()
      $($('.black-cover')[index]).hide()
    },
    createSwiper(){
      // $('.swiper-container').width($('body').width())
      // $('.swiper-container').height($('body').height())
      this.width = {
        width:$('body').width()
      }
      let sindex = this.array.findIndex(i=>i.targetId === this.$route.query.id)
      sindex = sindex === -1?0:sindex
       //  初始播放选中的视频
       this.playIndex = sindex
       this.firstLoad = true
      var that = this
      if(this.mySwiper){
        this.mySwiper.update(true)
      }else{
        this.mySwiper = new Swiper('.swiper-container',{
          slidesPerView :'auto',
          freeMode: true,
          freeModeSticky : true,
          direction: 'vertical',
          initialSlide:sindex,
          autoHeight:true,
          speed: 300,
          // passiveListeners : true,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeSlideChildren:true,
          observeParents:true,//修改swiper的父元素时，自动初始化swiper,
          on:{
            slideChange:function(){
              // 当滑动的index发生变化，就停止正在播放的视频
              // if(that.$refs['videoPlayer'+that.playIndex][0].isPlaying){
              //   that.$refs['videoPlayer'+that.playIndex][0].stopVideo()
              // }
              // that.$refs['videoPlayer'+that.playIndex][0].showReply = false
            },
            transitionEnd:function(){
              console.log('结束了',this.activeIndex)
        // // alert(this.activeIndex);
        // // console.log('this.activeIndex')
        //     // 将上一个播放的关掉 
        //     if(that.$refs['videoPlayer'+that.playIndex][0].isPlaying){
        //       console.log('将上一个暂停')
        //       that.$refs['videoPlayer'+that.playIndex][0].stopVideo()
        //     }
        //     that.$refs['videoPlayer'+that.playIndex][0].showReply = false
        //     // 播放居中的视频
        //     console.log(that.$refs['videoPlayer'+this.activeIndex][0])
        //     if(!that.$refs['videoPlayer'+this.activeIndex][0].isPlaying){
        //       if(that.firstLoad){
        //       console.log('将index第一次播放')
        //         // setTimeout(()=>{
        //           that.$refs['videoPlayer'+this.activeIndex][0].startVideo()
        //         // },150)
        //         that.firstLoad = false
        //       }else{
        //       console.log('将index之后播放')
        //         that.$refs['videoPlayer'+this.activeIndex][0].startVideo()
        //       }
        //     }
        //     // 将现在的index 变成正在播放的index
        //     that.playIndex = this.activeIndex
        //         // for(let k=0;k<that.array.length;k++){
        //         //   if(k === this.activeIndex){
        //         //      if(!that.$refs['videoPlayer'+this.activeIndex][0].isPlaying){
        //         //         that.$refs['videoPlayer'+this.activeIndex][0].startVideo()
        //         //       }
        //         //   }else{
        //         //      if(that.$refs['videoPlayer'+k][0].isPlaying){
        //         //         that.$refs['videoPlayer'+k][0].stopVideo() 
        //         //         // 销毁生成的回复框
        //         //         that.$refs['videoPlayer'+k][0].showReply = false
        //         //      }
        //         //   }
        //         // }
        //         // console.log(that.$refs['videoPlayer'+this.activeIndex])
        //         $('.black-cover').show()
        //         $($('.black-cover')[this.activeIndex]).hide()
              }
            }
        })
       this.mySwiper.slideTo(sindex)
      }
    }
  }
}
</script>
<style scoped>
  .video-player-child{
    width: 100%;
    height: 100%;
  }
  .video-card{
    /* background: #000; */
  }
  .black-cover{
    width:100%;
    height: 100%;
    background: #000;
    position: absolute;
    top:0;
    opacity: 0.8;
    z-index: 99;
  }
  .swiper-container{
    overflow: unset;
  }
  .swiper-slide{
    height: auto;
  }
</style>





