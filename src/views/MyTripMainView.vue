<template>
  <div>
    <!-- 상단 네브바 -->
    <top-back-nav :title="'나의 여행'"></top-back-nav>

    <!-- 날씨 정보 스와이퍼 -->
    <!-- 새벽에 날씨 안 나와서 일단 주석처리 -->
    <div v-if="plans.length != 0">
      <city-info-swiper :plans="plans"></city-info-swiper>
    </div>

    <!-- 여행 계획 -->
    <div class="main-content__plan">
      <div class="plan">
        <ul v-if="plans.length != 0">
          <li v-for="(val, idx) in plans" :key="idx" class="card__group">
            <div class="card">
              <!-- params 객체로 넘기기 -->
              <router-link
                class="plan__more-card"
                :to="{
                  name: 'mytripdetail',
                  params: {
                    sido_code: val.sido_code,
                    tripdetail: JSON.stringify(val),
                  },
                }">
                <div id="plan__title">{{ val.title }}</div>

                <div id="plan__period">
                  {{ val.startPeriod }} ~ {{ val.endPeriod }}
                </div>
              </router-link>
            </div>
            <div class="outline__button">
              <div
                class="material-symbols-outlined"
                @click="viewEdit = !viewEdit">
                more_vert
              </div>
              <div v-show="viewEdit" class="delete__button">
                <button @click="deletePlan(val.mytripNo)">삭제</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 버튼으로 모달 만들어서 도시 먼저 추가하게 vs 그냥 트립 인포에서 도시 추가하게 -->
    <button
      @click="$router.push({ name: 'mytripNew' })"
      class="add-article__btn">
      +
    </button>

    <app-footer></app-footer>
    <!-- 하단 네브바 -->
    <app-nav :navmode="'mytrip'"></app-nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "@/util/http-common.js";
import AppNav from "@/components/layout/AppNav.vue";
import CityInfoSwiper from "@/components/common/CityInfoSwiper.vue";
import TopBackNav from "@/components/layout/TopBackNav.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
// import http from "@/util/http-common";

export default {
  name: "MytripMainView",
  components: { AppNav, TopBackNav, AppFooter, CityInfoSwiper },
  data: function () {
    return {
      message: "",
      topNavNum: 0,
      plans: [],
      viewEdit: false,
      //sidos, sido_imgs 공통이니까
      //TripInfoView, CityInfoSwiper 들이랑 합쳐서 빼자.. 나중에
      sidos: {
        서울: 1,
        부산: 6,
      },
      sido_imgs: {
        서울: "https://a.cdn-hotels.com/gdcs/production60/d893/3172bd6f-726c-4561-810f-deec13d17a6e.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
        부산: "https://a.cdn-hotels.com/gdcs/production144/d1960/191730c7-8e21-4540-825c-65954ae4d132.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
      },
    };
  },
  created() {
    http.get(`/mytrip/${this.userInfo.userId}`).then((response) => {
      this.plans = response.data;
    });
  },
  methods: {
    deletePlan(mytripNo) {
      http
        .delete(`/mytrip/plan/${mytripNo}`)
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
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
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

.card__group {
  display: flex;
  width: 95vw;
}

.card {
  position: relative;
  left: 1.2rem;
  height: 20vw;
  width: 95vw;
  margin: 3vw;
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: rgba(224, 255, 255, 0.436);
}

.plan__more-card {
  text-decoration: none;
  color: black;
}

#plan__title {
  font-size: 1.2rem;
  margin-bottom: 0.4rem;
}

#plan__period {
  font-size: 0.9rem;
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
  background-color: #ffc062;
  border: solid 0;
  box-shadow: 2px 2px 2px 1px rgba(128, 128, 128, 0.29);
}

.outline__button {
  width: 3.8rem;
  margin: 1.3rem 0;
  position: relative;
  right: 2.8rem;
  top: 0.7rem;
}

button {
  border: 1px solid #989898;
  background-color: white;
  border-radius: 8px;
  font-size: 12px;
  margin-top: 4px;
}
</style>
