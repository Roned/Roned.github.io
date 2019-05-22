<template>
      <div class="card-height">
      <div  class="video-container">
       <div class="container">
        <div class="player">
          <video-player  class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="playsinline"
            :options="playerOptions"
            @play="onPlayerPlay($event)"
            @pause="onPlayerPause($event)"
            @ended="onPlayerEnded($event)"
            @loadeddata="onPlayerLoadeddata($event)"
            @waiting="onPlayerWaiting($event)"
            @playing="onPlayerPlaying($event)"
            @timeupdate="onPlayerTimeupdate($event)"
            @canplay="onPlayerCanplay($event)"
            @canplaythrough="onPlayerCanplaythrough($event)"
            @ready="playerReadied"
            @statechanged="playerStateChanged($event)"
          >
          </video-player>
        </div>
      </div>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
  import $ from 'jquery'
  import 'videojs-contrib-hls'
  import { videoPlayer } from 'vue-video-player';
  export default {
    name: 'videodetail',
    props:['videoData','selfIndex','startIndex'],
    data () {
      return {
        isPlaying:false,
        showReply:false,
        replyHeight:{},
        playerImgUrl:'',
       isload :false,
       index:1,
        playerOptions: {
      //  playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        //   autoplay: false, //如果true,浏览器准备好时开始回放。
        //   muted: false, // 默认情况下将会消除任何音频。
        //   loop: false, // 导致视频一结束就重新开始。
        //   preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        //   language: 'zh-CN',
        //   aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        //   fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        //   sources: [{
        //     type:"application/x-mpegURL",
        //     src: ""
        //   }],
        //   poster: "../../static/1.jpg", //你的封面地址
        // width: document.documentElement.clientWidth,
        // notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
              //  controlBar: {
              //    timeDivider: true,
              //    durationDisplay: true,
              //    remainingTimeDisplay: false,
              //    fullscreenToggle: true  //全屏按钮
              //  }
        },
      }
    },
    computed: {
      playsinline () {
        // let ua = navigator.userAgent.toLocaleLowerCase()
        // // x5内核
        // if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
        //   return false
        // } else {
        //   // ios端
        //   return true
        // }
      },
      player () {
        return this.$refs.videoPlayer.player
      },
    },
    created(){
        //   if(this.selfIndex === this.startIndex){
        //   this.player.play()
        // }
      this.$http.post('/loadVideo').then(res=>{
        console.log('加载视频url')
        // this.isload = true
        this.playerOptions = {
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'metadata', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type:"application/x-mpegURL",
            src: 'https://knowledge1-w.u.ccb.com/conversion/knowledgefiles/cptest/videos/201904/495878dc1e234a3382956eb98c868ba6/495878dc1e234a3382956eb98c868ba6_360p.m3u8?v=201953'
          }],
          poster: "../../static/1.jpg", //你的封面地址
          width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请'
        }
        // this.playerOptions.sources[0].src = res.data.url
      })
    },
    mounted () {
       
    },
    updated(){
    },
     beforeRouteLeave (to, from, next) {
       console.log(this.player,'存在')
   this.player.dispose()
       console.log(this.player,'不存在')
  },
    // beforeDestroy () {
    //   this.player.dispose()
    // },
    watch: {
    },
    methods: {
      pauseVideo (){
        this.player.pause()
      },
      playVideo(){
        this.player.play()
      },
      onPlayerPlay(){
        this.isPlaying = true
        this.$emit('changeIndex',this.selfIndex)
        console.log(this.index,'onPlayerPlay')
        this.index++
      },
      onPlayerPause(){
        this.isPlaying = false
        console.log(this.index,'onPlayerPause')
        this.index++
      },
      onPlayerCanplay (player) {
        console.log(this.index,'onPlayerCanplay')
        this.index++
        
          //  if(this.selfIndex === this.startIndex){
          //    console.log(this.player)
          // this.player.play()
        // }
        // var ua = navigator.userAgent.toLocaleLowerCase()
        // // x5内核
        // if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
        //   $('body').find('video').attr('x-webkit-airplay', 'true')
        //   .attr('x5-playsinline', 'true')
        //   .attr('webkit-playsinline', 'true')
        //   .attr('playsinline', 'true')
        //   // .attr('x5-video-player-type','h5')
        //   // .attr('x5-video-player-fullscreen','false')
        //   // .attr('x5-video-orientation','landscape')
        //   // .attr('x5-video-player-fullscreen',false)
        // } else {
        //   // ios端
        //   $('body').find('video').attr('webkit-playsinline', 'true').attr('playsinline', 'true')
        //   .attr('x5-video-player-type','h5')
        //   .attr('x5-video-player-fullscreen','false')
        //   .attr('x5-video-orientation','landscape')
        // }
      },
      onPlayerEnded(){
        this.isPlaying = false
         console.log(this.index,'onPlayerEnded')
        this.index++
      },
      onPlayerLoadeddata(){
         console.log(this.index,'onPlayerLoadeddata')
        this.index++
      },
      onPlayerWaiting(){
 console.log(this.index,'onPlayerWaiting')
        this.index++
      },
      onPlayerWaiting(){
           console.log(this.index,'onPlayerWaiting')
        this.index++
      },
      onPlayerPlaying(){
          console.log(this.index,'onPlayerPlaying')
        this.index++
      },
      onPlayerTimeupdate(){
           console.log(this.index,'onPlayerTimeupdate')
        this.index++
      },
      onPlayerCanplaythrough(){
           console.log(this.index,'onPlayerCanplaythrough')
        this.index++
        
      },
      playerReadied(){
          console.log(this.index,'playerReadied')
         $('body').find('video').attr('x-webkit-airplay', 'true')
          .attr('x-webkit-airplay', 'true')
          .attr('x5-playsinline', 'true')
          .attr('webkit-playsinline', 'true')
          .attr('playsinline', 'true')
        this.index++
       
      },
      statechanged(){
          console.log(this.index,'statechanged')
        this.index++
      },
      playerStateChanged(){
            console.log(this.index,'playerStateChanged')
        this.index++
       
      }
    },
    components: {
      // myvideo
      videoPlayer,
    }
  }
</script>

<style scoped>
.video-logo{
  width:1.6rem;
  position: absolute;
  top:0.6rem;
  right:0.2266666rem;
}
.play-pause{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  opacity: 0;
}
.s-content{
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #999;
  padding: 0.1rem 0;
  font-size: 0.4rem;
}
.video-msg{
  height: 2.4rem;
  background-color:#1D1E1F;
  padding: 0.4rem;
}
.inline-block{
  display: inline-block;
}
.card-height{
  width: 100%;
}
</style>
