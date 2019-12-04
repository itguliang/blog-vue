<template>
  <div class="video-play">
    <div>测试viedo</div>
    <video width="860" id="videoDemo" height="485" controls preload="auto" oncontextmenu="return false" ></video>
    <video-player  class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
        oncontextmenu="return false"
        customEventName="customstatechangedeventname"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
        @ended="onPlayerEnded($event)"
        @waiting="onPlayerWaiting($event)"
        @playing="onPlayerPlaying($event)"
        @loadeddata="onPlayerLoadeddata($event)"
        @timeupdate="onPlayerTimeupdate($event)"
        @canplay="onPlayerCanplay($event)"
        @canplaythrough="onPlayerCanplaythrough($event)"
        @statechanged="playerStateChanged($event)"
        @error="onPlayerError($event)"
        @ready="playerReadied">
  </video-player>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "",
            src:
              // "http://sante.weixinbe.com/public/supplier/1527739003138040.mp4"
              "http://www.html5videoplayer.net/videos/madagascar3.mp4"
          }
        ],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  mounted() {
    console.log("this is current player instance object", this.player);
    var video = document.getElementById("videoDemo");
    
    // var assetURL = "/media/demo2.1acc505e.mp4";
    var assetURL = "/media/demo3.153bdba9.mp4";
    
    // var mimeCodec = 'video/mp4;codecs="avc1.42E01E,mp4a.40.2"';
    var mimeCodec = 'video/mp4; codecs="avc1.64001E,mp4a.40.2"';
    
    // var assetURL = "/media/demo.cb6591eb.webm";
    // var mimeCodec = 'video/webm;codecs="vorbis,vp8"';

    if ("MediaSource" in window && MediaSource.isTypeSupported(mimeCodec)) {
      var mediaSource = new MediaSource();
      video.src = URL.createObjectURL(mediaSource);
      mediaSource.addEventListener("sourceopen", sourceOpen);
    } else {
      console.error("Unsupported MIME type or codec: ", mimeCodec);
    }

    function sourceOpen() {
      console.log(this); // open
      var mediaSource = this;
      var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
      fetchAB(assetURL, function(buf) {
        console.log(buf);
        console.log(sourceBuffer);
        sourceBuffer.addEventListener("updateend", function() {
          console.log(mediaSource);
          mediaSource.endOfStream();
          // video.play();
          console.log(mediaSource.readyState); // ended
        });
        sourceBuffer.appendBuffer(buf);
      });
    }
    function fetchAB(url, cb) {
      console.log("fetchAB----",url);
      var xhr = new XMLHttpRequest();
      xhr.open("get", url);
      xhr.responseType = "arraybuffer";
      xhr.onload = function() {
        console.log(xhr.response);
        cb(xhr.response);
      };
      xhr.send();
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    onPlayerPlay(player) {
      console.log("player play!", player);
    },
    onPlayerPause(player) {
      console.log("player pause!", player);
    },
    onPlayerEnded(player) {
      console.log("player end!", player);
    },
    onPlayerWaiting(player) {
      console.log("player waiting!", player);
    },
    onPlayerPlaying(player) {
      console.log("player playing!", player);
    },
    onPlayerLoadeddata(player) {
      console.log("player loaded data!", player);
    },
    onPlayerTimeupdate(player) {
      // console.log('player time update!', player)
    },
    onPlayerCanplay(player) {
      console.log("player can play!", player);
    },
    onPlayerCanplaythrough(player) {
      console.log("player Can playthrough!", player);
    },
    playerStateChanged(playerCurrentState) {
      console.log("player current update state", playerCurrentState);
    },
    onPlayerError(player) {
      console.log("player err", player);
    },
    playerReadied(player) {
      console.log("the player is readied", player);
      // you can use it to do something...
      // player.[methods]
    }
  }
};
</script>
<style scoped lang="scss">
.video-play {
  width: 50%;
  margin: 0 auto;
}
</style>
