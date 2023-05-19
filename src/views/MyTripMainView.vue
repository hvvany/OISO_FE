<template>
  <div>
    <!-- 상단 네브바 -->
    <top-back-nav :title="'나의 여행'"></top-back-nav>

    <!-- 날씨 정보 스와이퍼 -->
    <city-info-swiper :texts="plans.sido"></city-info-swiper>

    <!-- 여행 계획 -->
    <div class="main-content__plan">
      <div class="plan">
        <ul v-if="plans.length != 0">
          <li class="card" v-for="(val, sido, idx) in plans" :key="idx">
            <div>
              <router-link
                class="plan__more-card"
                :to="{
                  name: 'mytripmap',
                  params: { planNo: idx },
                }">
                <div id="plan__city">{{ val[0] }} 계획</div>
                <div id="plan__period">{{ val[1] }} ~ {{ val[2] }}</div>
              </router-link>
              <!-- params: { planNo: tripplan.planNo } -->
            </div>
          </li>
        </ul>
      </div>
    </div>

    <button
      @click="$router.push({ name: 'mytripnew' })"
      class="add-article__btn">
      +
    </button>

    <app-footer></app-footer>
    <!-- 하단 네브바 -->
    <app-nav :navmode="'mytrip'"></app-nav>
  </div>
</template>

<script>
import AppNav from "@/components/layout/AppNav.vue";
import CityInfoSwiper from "@/components/common/CityInfoSwiper.vue";
import TopBackNav from "@/components/layout/TopBackNav.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
// import http from "@/util/http-common";

export default {
  name: "MytripMainView",
  components: { AppNav, CityInfoSwiper, TopBackNav, AppFooter },
  data: function () {
    return {
      message: "",
      topNavNum: 0,
      plans: {
        서울: ["서울", "2023-06-09", "2023-06-12"],
        부산: ["부산", "2023-07-01", "2023-07-24"],
        울산: ["울산", "2023-06-02", "2023-06-04"],
        제주도: ["제주도", "2023-05-25", "2023-05-28"],
      },
    };
  },
  created() {
    // http.get("/mytrip").then((response) => {
    //   console.log(response);
    //   this.articles = response.data;
    // });
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
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: rgba(224, 255, 255, 0.436);
}

.plan__more-card {
  width: 0;
  text-decoration: none;
  color: black;
}

#plan__city {
  font-size: 1.4rem;
  margin-bottom: 0.4rem;
}

#plan__period {
  font-size: 1rem;
}

.add-article__btn {
  position: fixed;
  right: 1rem;
  bottom: 5rem;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 2rem;
  font-weight: 200;
  color: white;
  border-radius: 50%;
  background-color: #3485ff;
  border: solid 0;
  box-shadow: 2px 2px 2px 1px rgba(128, 128, 128, 0.29);
}
</style>
