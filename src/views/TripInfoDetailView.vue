<template>
  <div>
    <top-back-nav :title="info.title"></top-back-nav>
    <div class="info__addr">주소: {{ info.addr1 }} {{ info.addr2 }}</div>

    <div class="info__add">추가정보</div>
    <!-- 지도로 위치 찍어주고 -->
    <div v-if="info.mapx && info.mapy">
      <kakao-map :location="location"></kakao-map>
    </div>
    <!-- <div>{{ info.homepage }}</div>
    <div>{{ info.tel }}</div> -->

    <div class="info__overview" :inner-html.prop="info.overview"></div>
    <app-footer></app-footer>
    <app-nav></app-nav>
  </div>
</template>
<script>
import http from "@/util/http-common.js";
export default {
  name: "TripInfoDetail",
  components: {
    TopBackNav: () => import("@/components/layout/TopBackNav"),
    AppNav: () => import("@/components/layout/AppNav"),
    AppFooter: () => import("@/components/layout/AppFooter"),
    KakaoMap: () => import("@/components/common/KakaoMap"),
  },
  data() {
    return {
      contentId: 0,
      contentTypeId: 0,
      info: [],
      location: [],
    };
  },
  created() {
    this.contentId = this.$route.params.contentId;
    this.contentTypeId = this.$route.params.contentTypeId;

    const request_url =
      "https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=" +
      process.env.VUE_APP_WEATHER_KEY +
      "&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=" +
      this.contentId +
      "&contentTypeId=" +
      this.contentTypeId +
      "&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=10&pageNo=1";
    http.get(request_url).then((response) => {
      this.info = response.data.response.body.items.item[0];
      this.location["lat"] = this.info.mapy;
      this.location["lng"] = this.info.mapx;
    });
  },
  methods: {},
};
</script>

<style scoped>
.info__addr {
  margin: 2vw;
  font-size: 0.8rem;
}

.info__overview {
  line-height: 1.4rem;
  margin: 4vw 2vh;
  font-size: 0.8rem;
}

.info__add {
  font-size: 0.8rem;
  text-align: left;
  margin: 4vw 2vh;
}
</style>
