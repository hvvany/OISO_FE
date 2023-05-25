<template>
  <div v-if="plans.length > 0">
    <swiper
      :slides-per-view="1"
      :loop="false"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      :key="weather.length">
      <swiper-slide v-for="(item, index) in weather" :key="index">
        <div class="cards__card">
          <div class="weather_text">
            <div>지금 {{ item.LOC }}의</div>
            <div>온도는 {{ item.TMP }}℃</div>
            <div
              v-if="(item.TMN != 0) & (item.TMX != 0)"
              style="font-size: 1rem">
              최저 {{ item.TMN }}℃, 최고 {{ item.TMX }}℃
            </div>
            <div style="font-size: 1rem">
              {{ item.WTH }}
            </div>
          </div>
          <div class="weather_img">
            <img class="img" :src="item.ICON" />
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
import { mapGetters } from "vuex";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      weather: [],
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
      swiperKey: 0,
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
  computed: {
    ...mapGetters({
      plans: "plan",
    }),
  },
  mounted() {},
  methods: {
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log("slide change");
    },
    getWeatherInfo() {
      //이걸 계획만큼 반복해야 한다..!
      console.log("cis", this.plans.length);
      for (let i = 0; i < this.plans.length; i++) {
        let info = this.sidos[this.plans[i].sido_code];
        let sido_code = this.plans[i].sido_code;
        console.log("code", info, sido_code);

        const request_url =
          "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=" +
          process.env.VUE_APP_WEATHER_KEY +
          "&pageNo=1&numOfRows=100" +
          "&dataType=JSON&base_date=" +
          this.formattedDate +
          "&base_time=0500" +
          "&nx=" +
          info.nx +
          "&ny=" +
          info.ny;
        // console.log(request_url);

        http.get(request_url).then((response) => {
          let infos = {
            LOC: info.name,
            TMP: 0,
            TMN: 0,
            TMX: 0,
            SKY: 0,
            PTY: 0,
            WTH: "",
            ICON: "",
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
          infos.ICON = this.getIcon(temp);

          this.weather.push(infos);
          console.log("infos", infos);
          this.swiperKey += 1;
        });
      }
    },
    getIcon(temp) {
      return process.env.BASE_URL + "weather/" + temp + ".gif";
    },
  },
};
</script>
<style scoped>
.cards__card {
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.4rem;
}
.weather_text {
  float: left;
  font-size: 1rem;
}
.weather_img {
  margin-left: 4rem;
  float: right;
}

.img {
  width: 4rem;
  height: 4rem;
}
</style>
