<template>
  <div>
    <div id="map"></div>
    <div class="button-group">
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  props: {
    location: Array,
    tpye: String,
  },
  data() {
    return {
      map: null,
      markers: [],
      lines: [],
      infowindow: null,
      kakaoMap: null,
    };
  },
  created() {
    console.log("kakao", this.location);
  },
  mounted() {
    //카카오맵 준비는 되어 있는 경우
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" +
        process.env.VUE_APP_KAKAO_KEY;
      document.head.appendChild(script);
    }
  },
  watch: {
    location: {
      deep: true,
      handler(newVal, oldVal) {
        //기존 마커 제거
        console.log(oldVal);
        console.log(this.lines);
        if (this.lines.length > 0) {
          this.lines.forEach((item) => {
            item.setMap(null);
          });
        }
        this.displayMarker(newVal);
      },
    },
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      console.log("initMap", this.location);
      const options = {
        center: new kakao.maps.LatLng(
          this.location[0].mapy,
          this.location[0].mapx
        ),
        level: 4,
      };

      //지도 객체 등록
      this.map = new kakao.maps.Map(container, options);
      this.displayMarker(this.location);
    },

    displayMarker(location) {
      this.markers = [];
      for (let pos of location) {
        const latlng = new kakao.maps.LatLng(pos.mapy, pos.mapx);
        var marker = new kakao.maps.Marker({
          position: latlng,
        });
        this.markers.push(marker);
        marker.setMap(this.map);
      }
      this.displayLine();
    },
    displayLine() {
      this.lines = [];
      for (let i = 0; i < this.markers.length - 1; i++) {
        var polyline = new kakao.maps.Polyline({
          path: [
            this.markers[i].getPosition(),
            this.markers[i + 1].getPosition(),
          ],
          strokeWeight: 5,
          strokeColor: "#FF3DE5",
          strokeOpacity: 0.7,
          strokeStyle: "solid",
        });
        polyline.setMap(this.map);
        this.lines.push(polyline);
      }
    },
  },
};
</script>

<style scoped>
#map {
  margin: 4vw 2vh;
  height: 50vw;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>
