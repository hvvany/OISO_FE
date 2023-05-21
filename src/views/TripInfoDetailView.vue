<template>
  <div class="all">
    <top-back-nav :title="info.title"></top-back-nav>
    <button @click="addMyTrip">여행 계획에 추가</button>
    <img :src="info.firstimage" />
    <div class="info__addr">주소: {{ info.addr1 }} {{ info.addr2 }}</div>

    <div class="info__overview" :inner-html.prop="info.overview"></div>
    <hr />
    <br />
    <div class="info__add">
      추가정보
      <!-- 지도로 위치 찍어주고 -->
      <div v-if="info.mapx && info.mapy">
        <kakao-map :location="location"></kakao-map>
      </div>
      <div v-if="info.homepage">
        <span>공식 홈페이지 </span>
        <div :inner-html.prop="info.homepage"></div>
      </div>
      <div>{{ info.tel }}</div>
    </div>
    <app-footer></app-footer>
    <app-nav></app-nav>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
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
      // this.location["lat"] = this.info.mapy;
      // this.location["lng"] = this.info.mapx;
      let latlng = { lat: this.info.mapy, lng: this.info.mapx };
      this.location.push(latlng);
    });
  },
  methods: {
    addMyTrip() {
      http
        .post(`/mytrip/${this.userInfo.userId}`, {
          id: this.userInfo.userId,
          contentId: this.comment,
          contentTypeId: this.articleNo,
        })
        .then(({ status }) => {
          if (status == 200) {
            console.log("추가 성공");
            // this.$router.go();
          }
        });
    },
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
};
</script>

<style scoped>
.all {
  text-align: left;
}

button {
  float: right;
  margin: 4vw 2vh;
}

.info__addr {
  margin: 4vw 2vh;
  font-size: 0.8rem;
}

.info__overview {
  line-height: 1.4rem;
  margin: 4vw 2vh;
  font-size: 0.8rem;
}

.info__add {
  font-size: 0.8rem;
  margin: 4vw 2vh;
}
img {
  width: 80vw;
  display: block;
  margin: 0px auto;
}
</style>
