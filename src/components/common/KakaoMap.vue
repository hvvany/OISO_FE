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
        const latlng = new kakao.maps.LatLng(pos.lat, pos.lng);
        var marker = new kakao.maps.Marker({
          position: latlng,
        });
        marker.setMap(this.map);
        this.lines.push(latlng);
      }
      this.displayLine();
    },
    displayLine() {
      var polyline = new kakao.maps.Polyline({
        path: this.lines, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 5, // 선의 두께 입니다
        strokeColor: "#FF3DE5", // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "solid", // 선의 스타일입니다
      });
      polyline.setMap(this.map);
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
