<template>
    <div>
      <div :id="'my-video'+videoIndex" @touchend="showPlayButton($event)">

      </div>
    </div>
</template>
<script type='text/ecmascript-6'>
  import $ from 'jquery'
  import Hls from  'hls.js'
  import DPlayer from 'dplayer'
  var dp
  var hls
  export default {
    name: 'videodetail',
    props:['videoData','selfIndex','startIndex','videoIndex'],
    data () {
      return {
        hls:null,
        dp:null
      }
    },
    computed: {
    
    },
    created(){
     
    },
    mounted () {
    this.$http.post('/loadVideo').then(res=>{
        console.log(res)
        this.createVideo(res)
    })
    },
    updated(){
    },
    destroyed() {
      
      // this.hls.destory()
      // this.dp.destroy()
    },
    beforeDestroy(){
      // this.hls.destory()
      // this.dp.destroy()
    },
    watch: {
      '$route' (to, from) {
        console.log('111')
        // this.hls.destory()
        // this.dp.destroy()
      }
    },
    methods: {
      showPlayButton(e){
        console.log(dp.video.paused)
        console.log(dp.video.played)
        console.log(dp.video.played.length)
        if($(e.target)[0].className === 'dplayer-video dplayer-video-current'){
          dp.toggle()
          console.log(dp.video.currentTime)
        }
      },
      playVideo(){
        setTimeout(function(){
          dp.toggle()
        },200)
      },
      createVideo(res){
          var that = this
          dp = new DPlayer({
          container: document.getElementById('my-video'+this.videoIndex),
          autoplay: true,
          danmaku:false,
          theme: '#fff',
          loop: true,
          lang: 'zh-cn',
          screenshot: true,
          hotkey: false,
          preload: 'auto',
          volume: 0.7,
          mutex: true,
          video: {
                  url: res.data.url,
                  type: 'customHls',
                  // pic: '../../static/1.jpg',
                  thumbnails:'../../static/1.jpg',
                  customType: {
                      'customHls': function (video, player) {
                          hls = new Hls();
                          hls.loadSource(video.src);
                          hls.attachMedia(video);
                      }
                  }
              }
          })
dp.on('waiting', function () {
              console.log('waiting');
          });  
dp.on('volumechange', function () {
              console.log('volumechange');
          });
dp.on('timeupdate', function () {
              console.log('timeupdate');
          });
dp.on('seeking', function () {
              console.log('seeking');
          });
dp.on('seeked', function () {
              console.log('seeked');
          });
dp.on('suspend', function () {
              console.log('suspend');
          });
dp.on('stalled', function () {
              console.log('stalled');
          });
dp.on('ratechange', function () {
              console.log('ratechange');
          });
dp.on('progress', function () {
              console.log('progress');
          });
dp.on('playing', function () {
              console.log('playing');
          });
dp.on('play', function () {
              console.log('play');
          });
dp.on('pause', function () {
              console.log('pause');
          });
dp.on('mozaudioavailable', function () {
              console.log('mozaudioavailable');
          });
dp.on('loadstart', function () {
              console.log('loadstart');
          });
dp.on('loadedmetadata', function () {
              console.log('loadedmetadata');
          });
 dp.on('loadeddata', function () {
              console.log('loadeddata');
          });
  dp.on('error', function () {
              console.log('error');
          });
          dp.on('abort', function () {
              console.log('abort');
          });
           dp.on('canplaythrough', function () {
              console.log('canplaythrough');
             
          });
             dp.on('durationchange', function () {
              console.log('durationchange');
          });
              dp.on('emptied', function () {
              console.log('emptied');
          });
             dp.on('ended', function () {
              console.log('ended');
          });
           dp.on('canplay', function () {
              console.log('canplay');
              //  dp.toggle()
               console.log(dp.video.played.length)
               that.playVideo()
          });
          dp.on('screenshot', function () {
              console.log('screenshot');
          });
          dp.on('thumbnails_show', function () {
              console.log('thumbnails_show');
          });
           dp.on('thumbnails_hide', function () {
              console.log('thumbnails_hide');
          });
            dp.on('thumbnails_hide', function () {
              console.log('thumbnails_hide');
          });
          dp.on('contextmenu_show', function () {
              console.log('contextmenu_show');
          });
          dp.on('contextmenu_hide', function () {
              console.log('contextmenu_hide');
          });
          dp.on('quality_start', function () {
              console.log('quality_start');
          });
          dp.on('quality_end', function () {
              console.log('quality_end');
          });
          dp.on('subtitle_show', function () {
              console.log('subtitle_show');
          });
           dp.on('subtitle_hide', function () {
              console.log('subtitle_hide');
          }); 
          dp.on('subtitle_change', function () {
              console.log('subtitle_change');
          });
          // screenshot
          // thumbnails_show
          // thumbnails_hide
          // danmaku_show
          // danmaku_hide
          // danmaku_clear
          // danmaku_loaded
          // danmaku_send
          // danmaku_opacity
          // contextmenu_show
          // contextmenu_hide
          // notice_show
          // notice_hide
          // quality_start
          // quality_end
          // destroy
          // resize
          // fullscreen
          // fullscreen_cancel
          // subtitle_show
          // subtitle_hide
          // subtitle_change
      }
    },
    components: {
      // myvideo
    }
  }
</script>

<style scoped>
  .color{
    color: #FADFA3
  }
</style>
