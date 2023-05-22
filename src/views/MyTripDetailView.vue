<template>
  <div>
    <top-back-nav :title="'MyTrip'"></top-back-nav>
    <div v-if="detailInfo.length > 0">
      <kakao-map :location="location" type="detail"></kakao-map>
    </div>

    <ul>
      <li v-for="(value, idx) in totalInfo" :key="idx">
        <div>{{ value[0][0].title }}</div>
        <button @click="deleteDetail">삭제</button>
        <!-- 아니 구조 진짜 이상한데...ㅋㅋㅋ -->
      </li>
    </ul>

    <app-footer></app-footer>
    <app-nav :navmode="'mytrip'"></app-nav>
  </div>
</template>

<script>
import AppNav from "@/components/layout/AppNav.vue";
import TopBackNav from "@/components/layout/TopBackNav.vue";
import KakaoMap from "@/components/common/KakaoMap.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import http from "@/util/http-common";
import { mapGetters } from "vuex";
export default {
  name: "MytripView",
  components: { AppNav, TopBackNav, AppFooter, KakaoMap }, //

  data() {
    return {
      message: "",
      info: [],
      tripInfo: [],
      detailInfo: [],
      totalInfo: [],
      location: [],
      tripdetail: this.$route.params.tripdetail,
      sido_code: this.$route.params.sido_code,
    };
  },
  created() {
    this.getInfo();
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    //일단 db에서 계획을 가져오고
    getInfo() {
      //db에 저장된 여행 상세 정보 가져와서 공공 데이터로
      //이거 가져올 때 day로 정렬해서 가져와야겠다!
      http
        .get("/mytrip/" + this.userInfo.userId + "/" + this.sido_code)
        .then((response) => {
          this.tripInfo = response.data;

          //가져온 여행지 하나씩 돌아가면서 상세 정보 가져오기 (지도 마커 용도)
          for (let trip of this.tripInfo) {
            const request_url =
              "https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=" +
              process.env.VUE_APP_WEATHER_KEY +
              "&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=" +
              trip.contentId +
              "&contentTypeId=" +
              trip.contentTypeId +
              "&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=10&pageNo=1";

            http
              .get(request_url)
              .then((response) => {
                this.detailInfo = [];
                this.detailInfo.push(response.data.response.body.items.item);
              })
              .finally(() => {
                this.totalInfo.push(this.detailInfo);
                this.getDetail();
              });
          }
        });
    },
    getDetail() {
      for (let test of this.detailInfo) {
        let latlng = { lat: test[0].mapy, lng: test[0].mapx };
        this.location.push(latlng);
      }
    },
    deleteDetail() {
      console.log();
      http
        .delete(`/trip/${this.userInfo.userId}/${this.detailNo}`)
        .then((response) => {
          console.log("삭제 완료");
          console.log(response.data);
        })
        .catch((response) => {
          console.log("error.");
          console.log(response.data);
        });
    },
  },
};
</script>

<style scoped></style>
