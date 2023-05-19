<template>
  <div>
    <swiper
      :slides-per-view="1"
      :loop="false"
      @swiper="onSwiper"
      @slideChange="onSlideChange">
      <swiper-slide
        class="swiper__slide-img"
        v-for="(value, key, idx) in weather"
        :key="idx">
        <div class="cards__card">
          <div class="weather_text">
            <div>지금 {{ value["LOC"] }} 의</div>
            <div>온도는 {{ value["TMP"] }}℃</div>
            <div style="font-size: 1rem">
              최저 {{ value["SKY"] }}℃, 최고 {{ value["TMX"] }}℃
            </div>
            <div style="font-size: 1rem">
              하늘 {{ value["SKY"] }}, 비 {{ value["PTY"] }}
            </div>
          </div>
          <div class="weather_img">
            <img
              class="img"
              src="https://velog.velcdn.com/images/hvvany/post/a64ad69a-eccb-4a55-94f3-2b05ea7c55f7/image.jpeg" />
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper-vue2";
import "swiper/swiper-bundle.css";

import http from "@/util/http-common.js";

export default {
  props: {
    // texts: Object,
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      weather: { 1: [] },
      formattedDate: "",
      sidos: {
        서울: { sido_code: 1, nx: 60, ny: 127 },
        인천: { sido_code: 2, nx: 55, ny: 124 },
        대전: { sido_code: 3, nx: 67, ny: 100 },
        대구: { sido_code: 4, nx: 89, ny: 90 },
        광주: { sido_code: 5, nx: 58, ny: 74 },
        부산: { sido_code: 6, nx: 98, ny: 76 },
        울산: { sido_code: 7, nx: 102, ny: 84 },
        세종: { sido_code: 8, nx: 66, ny: 103 },
        경기도: { sido_code: 31, nx: 60, ny: 120 },
        강원도: { sido_code: 32, nx: 73, ny: 134 },
        충청북도: { sido_code: 33, nx: 69, ny: 107 },
        충청남도: { sido_code: 34, nx: 68, ny: 100 },
        경상북도: { sido_code: 35, nx: 89, ny: 91 },
        경상남도: { sido_code: 36, nx: 91, ny: 77 },
        전라북도: { sido_code: 37, nx: 63, ny: 89 },
        전라남도: { sido_code: 38, nx: 51, ny: 67 },
        제주도: { sido_code: 39, nx: 52, ny: 38 },
      },
    };
  },
  created() {
    //오늘 날짜
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    this.formattedDate = today.getFullYear() + month + day;
    this.getWeatherInfo();
  },
  computed: {},
  methods: {
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log("slide change");
    },
    getWeatherInfo() {
      //이걸 계획만큼 반복해야 한다..!
      const request_url =
        "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=" +
        process.env.VUE_APP_WEATHER_KEY +
        "&pageNo=1&numOfRows=14" +
        "&dataType=JSON&base_date=" +
        this.formattedDate +
        "&base_time=0500" +
        "&nx=" +
        "94" +
        "&ny=" +
        "74";
      console.log(request_url);

      http.get(request_url).then((response) => {
        let infos = {
          LOC: "서울",
          TMP: 0,
          TMN: 0,
          TMX: 0,
          SKY: 0,
          PTY: 0,
        };
        for (let info of response.data.response.body.items.item) {
          if (info.category === "TMP") {
            infos.TMP = info.fcstValue;
          } else if (info.category === "TMN") {
            infos.TMN = info.fcstValue;
          } else if (info.category === "TMX") {
            infos.TMX = info.fcstValue;
          } else if (info.category === "SKY") {
            infos.SKY = info.fcstValue;
          } else if (info.category === "PTY") {
            infos.PTY = info.fcstValue;
          }
        }
        this.weather[1] = infos;
        console.log(this.weather);
      });
      // this.getWeather();
    },
    // getWeather() {

    // },
  },
};
</script>
<style scoped>
.swiper__slide-img {
  width: 100rem;
  height: 8rem;
  color: aliceblue;
  text-align: left;
  line-height: 2rem;
  font-size: 1.4rem;
}
.cards__card {
  width: 100vw;
  height: 8rem;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
}
.weather_text {
  float: left;
}
.weather_img {
  margin-left: 1rem;
  float: right;
}

.img {
  width: 6rem;
  height: 6rem;
}
</style>
