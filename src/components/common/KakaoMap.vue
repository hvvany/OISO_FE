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
      infowindow: null,
    };
  },
  created() {},
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
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(
          this.location[0].lat,
          this.location[0].lng
        ),
        level: 4,
      };

      //지도 객체 등록
      this.map = new kakao.maps.Map(container, options);
      // this.deleteMarker();
      this.displayMarker(this.location);
    },
    deleteMarker() {
      //지금 표시된 마커들 지우기
      if (this.markers.length > 0) {
        this.markers.forEach((item) => {
          item.setMap(null);
        });
      }
    },
    displayMarker() {
      console.log(this.location);
      for (let pos of this.location) {
        var marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(pos.lat, pos.lng),
        });
        marker.setMap(this.map);
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
