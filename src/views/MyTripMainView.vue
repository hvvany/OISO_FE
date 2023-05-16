<template>
  <div>
    <!-- 상단 네브바 -->
    <top-back-nav :title="'나의 여행'"></top-back-nav>

    <!-- 날씨 정보 스와이퍼 -->
    <city-info-swiper :texts="sidos"></city-info-swiper>

    <!-- 여행 계획 -->
    <div class="main-content__plan">
      <div class="plan">
        <ul v-if="sidos.length != 0">
          <li v-for="(code, sido, idx) in sidos" :key="idx">
            <div class="card">
              <router-link class="plan__more-card" :to="{ name: 'mytripmap' }">
                {{ sido }} 자세히
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 하단 네브바 -->
    <app-nav :navmode="'mytrip'"></app-nav>
  </div>
</template>

<script>
import AppNav from "@/components/layout/AppNav.vue";
import CityInfoSwiper from "@/components/common/CityInfoSwiper.vue";
import TopBackNav from "@/components/layout/TopBackNav.vue";
export default {
  name: "MytripMainView",
  components: { AppNav, CityInfoSwiper, TopBackNav },
  data: function () {
    return {
      message: "",
      topNavNum: 0,
      sidos: {
        서울: 1,
        부산: 6,
        울산: 7,
        제주도: 39,
      },
    };
  },
  created() {
  },
  methods: {},
};
</script>

<style scoped>
.city-info-swiper {
  position: sticky;
  top: 0;
}

.plan {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 1rem 0 1rem;
}

.card {
  height: 20vw;
  width: 85vw;
  margin: 3vw;
  border: 1px solid;
  justify-content: center;
}

.plan__more-card {
  text-decoration: none;
  font-size: 1.5rem;
  color: black;
}
</style>
