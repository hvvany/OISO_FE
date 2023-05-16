<template>
  <div>
    <top-back-nav :title="'관광지 정보 조회'"></top-back-nav>
    <div
      v-if="sido_pick != '도시를 선택해 주세요'"
      class="sido"
      :style="
        'background-image: linear-gradient(rgba(0, 0, 0, 0.35),rgba(0, 0, 0, 0.35)), url(' +
        sido_imgs[sido_pick] +
        ');'
      ">
      <h1 class="sido__title">{{ sido_pick }}</h1>
      <button class="sido__btn" @click="changeMode()">시/도 선택</button>
    </div>
    <div v-else class="sido" style="background-color: rgb(0, 0, 0)">
      <h1 class="sido__title">{{ sido_pick }}</h1>
      <button class="sido__btn" @click="changeMode()">시/도 선택</button>
    </div>
    <text-swiper
      class="filter-swiper"
      :texts="filters"
      :now_filter="now_filter"></text-swiper>
    <ul v-if="input_mode === 0" class="sido-lst">
      <li v-for="(code, sido, idx) in sidos" :key="idx">
        <div class="sido-lst__item">
          <div class="sido-lst__left">
            <div
              class="item__img"
              :style="'background-image: url(' + sido_imgs[sido] + ')'"></div>
            <h3 class="item__sido">{{ sido }}</h3>
          </div>
          <button class="item__btn" @click="pickSido(sido)">선택</button>
        </div>
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
import TopBackNav from "@/components/layout/TopBackNav.vue";
export default {
  name: "TripInfo",
  components: { AppNav, TextSwiper, TopBackNav },
  data() {
    return {
      message: "",
      filters: {
        관광지: 12,
        문화시설: 14,
        축제공연: 15,
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
      sido_imgs: {
        서울: "https://a.cdn-hotels.com/gdcs/production60/d893/3172bd6f-726c-4561-810f-deec13d17a6e.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
        인천: "https://a.cdn-hotels.com/gdcs/production1/d1836/6bd75900-f22e-4974-a748-5884b92a28b8.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
        대전: "https://a.cdn-hotels.com/gdcs/production10/d812/60c0d2de-6e54-4f4f-8c74-0c0757fd750b.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
        대구: "https://a.cdn-hotels.com/gdcs/production16/d1777/d35d743e-9d7b-482a-a6b4-c6037dec11b7.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
        광주: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/47/54/d2/peak-saeinbong.jpg?w=1200&h=-1&s=1",
        부산: "https://a.cdn-hotels.com/gdcs/production144/d1960/191730c7-8e21-4540-825c-65954ae4d132.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
        울산: "https://a.cdn-hotels.com/gdcs/production10/d897/6d22ee20-0f8c-45c7-8c65-9ae0043263d7.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
        세종: "https://www.kculture.or.kr/jnrepo/upload/mig/iims_data/img/30_v.jpg",
        경기도:
          "https://heritage.unesco.or.kr/wp-content/uploads/2019/04/hd6_394_i1.jpg",
        강원도:
          "https://a.cdn-hotels.com/gdcs/production77/d1383/74886016-f897-4c87-9337-81a362840f6d.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
        충청북도:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/78/df/2d/1300291-largejpg.jpg?w=1200&h=-1&s=1",
        충청남도:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/ed/06/47/caption.jpg?w=1200&h=-1&s=1",
        경상북도:
          "https://a.cdn-hotels.com/gdcs/production9/d1467/a4e9ad3b-0465-405c-beb5-581116842d32.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
        경상남도:
          "https://a.cdn-hotels.com/gdcs/production193/d916/24b473af-1be6-4656-8cd0-88e1cbafdc0c.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
        전라북도:
          "https://a.cdn-hotels.com/gdcs/production111/d1446/b6ece273-9a32-4011-81aa-daf75d7ccb43.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
        전라남도:
          "https://a.cdn-hotels.com/gdcs/production24/d273/e5de0657-4fef-4317-b924-cb05bb99c6d8.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
        제주도:
          "https://a.cdn-hotels.com/gdcs/production58/d323/da9d76f0-35fa-4f8d-a9d0-8a6e24e9d03f.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
      },
      sido_pick: "도시를 선택해 주세요",
      input_mode: -1, // mode 0 :시도 입력모드   1 : 관광지, 문화시설... 필터 입력 모드
      now_filter: "관광지", // 현재 정보 검색 필터 선택된 모드, 기본값은 관광지 -> 스와이퍼에 넘겨줌
    };
  },
  created() {},
  methods: {
    changeMode() {
      this.input_mode = (this.input_mode + 1) % 2;
    },
    pickSido(sido) {
      this.sido_pick = sido;
      this.input_mode = 1;
    },
    changeFilter(filter) {
      this.now_filter = filter;
    },
  },
};
</script>

<style scoped>
.sido {
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 1rem;
  height: 7rem;
  background-size: cover;
}
.sido__title {
  color: white;
  align-self: center;
  margin: 0.5rem;
  font-size: 1.5rem;
  font-weight: 800;
}
.sido__btn {
  align-self: end;
  font-size: 0.4rem;
  height: 1.3rem;
  color: white;
  background-color: #3485ff;
  border: solid 0;
  border-radius: 10px;
  padding: 0.3rem 0.3rem;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.29);
}
.filter-swiper {
  padding: 0.8rem 0;
}
.sido-lst__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  width: 100vw;
  height: 3rem;
  background-color: white;
  border-bottom: solid 0.1px rgb(211, 211, 211);
}
.sido-lst__left {
  display: flex;
  align-items: center;
}
.item__img {
  background-size: cover;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
}

.item__sido {
  margin: 0.5rem;
  font-size: 0.8rem;
  font-weight: 800;
}
.item__btn {
  border-radius: 10px;
  border: 0;
  background-color: rgba(213, 213, 213, 0.581);
  justify-self: end;
  font-size: 0.6rem;
  padding: 0.3rem 0.4rem;
}
</style>
