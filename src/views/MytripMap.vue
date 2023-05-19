<template>
  <div>
    <top-back-nav :title="'MyTrip'"></top-back-nav>
    <kakao-map></kakao-map>
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
  components: { AppNav, TopBackNav, KakaoMap, AppFooter },
  data() {
    return {
      message: "",
      planNo: Number,
    };
  },
  created() {
    this.planNo = this.$route.params.planNo;
    console.log(this.planNo);
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    //일단 db에서 계획을 가져오고
    getMyTrip() {
      http.get("/mytrip/" + this.userInfo.userId).then((response) => {
        this.comments = response.data;
        // console.log(this.comments);
      });
    },
    //그걸 기반으로 키워드 검색하기
    // getInfo() {
    //   const request_url =
    //     "https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=" +
    //     process.env.VUE_APP_WEATHER_KEY +
    //     "&numOfRows=10&pageNo=1&MobileOS=WIN&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword=" +
    //     this.keyword +
    //     "&contentTypeId=" +
    //     this.typeId;
    //   http.get(request_url).then((response) => {
    //     console.log(response.data.response.body.items.item);
    //     this.total_infos.push(...response.data.response.body.items.item);
    //     console.log(this.total_infos);
    //   });
    // },
  },
};
</script>

<style scoped></style>
