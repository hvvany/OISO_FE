<template>
  <div>
    <h1>지역별 관광지 검색 페이지</h1>
    <button @click="changeMode()">{{ sido_btn }}</button>
    <text-swiper :texts="filters"></text-swiper>
    <hr />
    <ul v-if="input_mode === 0">
      <li v-for="(code, sido, idx) in sidos" :key="idx">
        <button @click="pickSido(sido)">{{ sido }}</button>
      </li>
    </ul>
    <ul v-if="input_mode === 1">
      <h1>필터</h1>
    </ul>
    <app-nav></app-nav>
  </div>
</template>

<script>
import AppNav from "@/components/layout/AppNav.vue";
import TextSwiper from "@/components/common/TextSwiper.vue";
export default {
  name: "TripInfo",
  components: { AppNav, TextSwiper },
  data() {
    return {
      message: "",
      filters: {
        관광지: 12,
        문화시설: 14,
        축제공연행사: 15,
        여행코스: 28,
        레포츠: 28,
        숙박: 32,
        쇼핑: 38,
        음식점: 39,
      },
      sidos: {
        서울: 1,
        인천: 2,
        대전: 3,
        대구: 4,
        광주: 5,
        부산: 6,
        울산: 7,
        세종: 8,
        경기도: 31,
        강원도: 32,
        충청북도: 33,
        충청남도: 34,
        경상북도: 35,
        경상남도: 36,
        전라북도: 37,
        전라남도: 38,
        제주도: 39,
      },
      sido_btn: "시/도",
      gugun_btn: "구/군",
      input_mode: -1, // mode 0 :시도 입력모드   1 : 관광지, 문화시설... 필터 입력 모드
    };
  },
  created() {},
  methods: {
    changeMode() {
      this.input_mode = (this.input_mode + 1) % 2;
    },
    pickSido(sido) {
      this.sido_btn = sido;
      this.input_mode = 1;
    },
  },
};
</script>

<style scoped></style>
