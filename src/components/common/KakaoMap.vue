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
    center: Object,
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
    if (window.kakao && window.kakao.maps) {
      console.log("1");
      this.initMap();
    } else {
      /* global kakao */
      console.log("2");
      this.loadScript();
    }
  },
  watch: {
    location: {
      deep: true,
      handler(newVal, oldVal) {
        //기존 마커 제거
        console.log("old", oldVal);
        if (this.lines.length > 0) {
          this.lines.forEach((item) => {
            item.setMap(null);
          });
        }
        this.displayMarker(newVal);
      },
    },
    center: {
      deep: true,
      handler(newVal, oldVal) {
        console.log("old", oldVal);
        console.log(newVal.lat, newVal.lng);
        this.map.setCenter(new kakao.maps.LatLng(newVal.lat, newVal.lng));
      },
    },
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      if (container) {
        let options = { center: new kakao.maps.LatLng(35.096117, 128.853647) };

        //지도 객체 등록
        this.map = new kakao.maps.Map(container, options);
        this.displayMarker(this.location);
      }
    },
    loadScript() {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" +
        process.env.VUE_APP_KAKAO_KEY;
      script.onload = () => kakao.maps.load(this.initMap);
      document.head.appendChild(script);
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
      console.log(location[0]);
      this.map.setCenter(
        new kakao.maps.LatLng(location[0].mapy, location[0].mapx)
      );
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
