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
            <div
              v-if="(value['TMN'] != 0) & (value['TMX'] != 0)"
              style="font-size: 1rem">
              최저 {{ value["TMN"] }}℃, 최고 {{ value["TMX"] }}℃
            </div>
            <div style="font-size: 1rem">
              {{ value["WTH"] }}
            </div>
          </div>
          <div class="weather_img">
            <img class="img" :src="weather_icon" />
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
    plans: Array,
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      weather: { 1: [] },
      formattedDate: "",
      now: 0,
      weather_icon: "",
      sidos: {
        1: { name: "서울", nx: 60, ny: 127 },
        2: { name: "인천", nx: 55, ny: 124 },
        3: { name: "대전", nx: 67, ny: 100 },
        4: { name: "대구", nx: 89, ny: 90 },
        5: { name: "광주", nx: 58, ny: 74 },
        6: { name: "부산", nx: 98, ny: 76 },
        7: { name: "울산", nx: 102, ny: 84 },
        8: { name: "세종", nx: 66, ny: 103 },
        31: { name: "경기도", nx: 60, ny: 120 },
        32: { name: "강원도", nx: 73, ny: 134 },
        33: { name: "충청북도", nx: 69, ny: 107 },
        34: { name: "충청남도", nx: 68, ny: 100 },
        35: { name: "경상북도", nx: 89, ny: 91 },
        36: { name: "경상남도", nx: 91, ny: 77 },
        37: { name: "전라북도", nx: 63, ny: 89 },
        38: { name: "전라남도", nx: 51, ny: 67 },
        39: { name: "제주도", nx: 52, ny: 38 },
      },
    };
  },
  created() {
    //오늘 날짜
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    this.formattedDate = today.getFullYear() + month + day;
  },
  computed: {},
  methods: {
    onSwiper(swiper) {
      console.log(swiper);
      this.getWeatherInfo();
    },
    onSlideChange() {
      this.now++; //스와이퍼로 넘길 때마다 +- 하고싶은데...
      console.log("slide change");
    },
    getWeatherInfo() {
      //이걸 계획만큼 반복해야 한다..!
      //근데 이게 5시 발표 기준이라 00시~05시까지는 동작을 안 하는데...ㅎ

      let code = this.sidos[this.plans[this.now].sido_code];
      console.log("this.plans", this.plans[this.now].sido_code);
      console.log("code", code);
      const request_url =
        "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=" +
        process.env.VUE_APP_WEATHER_KEY +
        "&pageNo=1&numOfRows=100" +
        "&dataType=JSON&base_date=" +
        this.formattedDate +
        "&base_time=0500" +
        "&nx=" +
        code.nx +
        "&ny=" +
        code.ny;
      console.log(request_url);

      http.get(request_url).then((response) => {
        let infos = {
          LOC: code.name,
          TMP: 0,
          TMN: 0,
          TMX: 0,
          SKY: 0,
          PTY: 0,
          WTH: "",
        };
        console.log(response.data.response.body);
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
        let temp = "";
        if (infos.PTY == 0) {
          if (infos.SKY == 1) {
            infos.WTH = "맑음";
            temp = "sunny";
          } else if (infos.SKY == 3) {
            infos.WTH = "구름 많음";
            temp = "partly_cloudy";
          } else if (infos.SKY == 4) {
            infos.WTH = "흐림";
            temp = "cloudy";
          }
        } else if (infos.PTY == 1) {
          infos.WTH = "비";
          temp = "rainy";
        } else if (infos.PTY == 2) {
          infos.WTH = "비 또는 눈";
          temp = "mix";
        } else if (infos.PTY == 3) {
          infos.WTH = "눈";
          temp = "snowy";
        } else if (infos.PTY == 4) {
          infos.WTH = "소나기";
          temp = "rainy";
        }
        this.weather_icon = this.getIcon(temp);
        console.log("날씨", infos.WTH);

        this.weather[1] = infos;
        console.log(this.weather);
      });
    },
    getIcon(temp) {
      return process.env.BASE_URL + "weather/" + temp + ".png";
    },
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
