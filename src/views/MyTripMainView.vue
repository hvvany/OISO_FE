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
      <div class="mytrip__title">여행 계획</div>
      <div class="plan">
        <ul v-if="plans.length != 0">
          <li v-for="(val, idx) in plans" :key="idx" class="card__group">
            <div
              class="card"
              :style="
                'background-image: linear-gradient(rgba(0, 0, 0, 0.35),rgba(0, 0, 0, 0.35)), url(' +
                sido_imgs[val.sido_code] +
                ')'
              ">
              <!-- params 객체로 넘기기 -->
              <router-link
                class="plan__more-card"
                :to="{
                  name: 'mytripdetail',
                  params: {
                    sido_code: val.sido_code,
                    startPeriod: val.startPeriod,
                    endPeriod: val.endPeriod,
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
                style="color: white"
                @click="val.viewEdit = !val.viewEdit">
                more_vert
              </div>
              <div v-if="val.viewEdit">
                <button
                  class="edit__button"
                  @click="
                    $router.push({
                      name: 'mytripModify',
                      params: { plan: JSON.stringify(val) },
                    })
                  ">
                  수정
                </button>
                <button
                  class="edit__button"
                  @click="deletePlan(val.mytripNo, idx)">
                  삭제
                </button>
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

export default {
  name: "MytripMainView",
  components: {
    AppNav,
    TopBackNav,
    AppFooter,
    CityInfoSwiper,
  },
  data: function () {
    return {
      message: "",
      topNavNum: 0,
      plans: [],
      viewEdit: false,
      sido_imgs: {
        1: "https://a.cdn-hotels.com/gdcs/production60/d893/3172bd6f-726c-4561-810f-deec13d17a6e.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
        2: "https://a.cdn-hotels.com/gdcs/production1/d1836/6bd75900-f22e-4974-a748-5884b92a28b8.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
        3: "https://a.cdn-hotels.com/gdcs/production10/d812/60c0d2de-6e54-4f4f-8c74-0c0757fd750b.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
        4: "https://a.cdn-hotels.com/gdcs/production16/d1777/d35d743e-9d7b-482a-a6b4-c6037dec11b7.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
        5: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/47/54/d2/peak-saeinbong.jpg?w=1200&h=-1&s=1",
        6: "https://a.cdn-hotels.com/gdcs/production144/d1960/191730c7-8e21-4540-825c-65954ae4d132.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
        7: "https://a.cdn-hotels.com/gdcs/production10/d897/6d22ee20-0f8c-45c7-8c65-9ae0043263d7.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
        8: "https://www.kculture.or.kr/jnrepo/upload/mig/iims_data/img/30_v.jpg",
        31: "https://heritage.unesco.or.kr/wp-content/uploads/2019/04/hd6_394_i1.jpg",
        32: "https://a.cdn-hotels.com/gdcs/production77/d1383/74886016-f897-4c87-9337-81a362840f6d.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
        33: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/78/df/2d/1300291-largejpg.jpg?w=1200&h=-1&s=1",
        34: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/ed/06/47/caption.jpg?w=1200&h=-1&s=1",
        35: "https://a.cdn-hotels.com/gdcs/production9/d1467/a4e9ad3b-0465-405c-beb5-581116842d32.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
        36: "https://a.cdn-hotels.com/gdcs/production193/d916/24b473af-1be6-4656-8cd0-88e1cbafdc0c.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
        37: "https://a.cdn-hotels.com/gdcs/production111/d1446/b6ece273-9a32-4011-81aa-daf75d7ccb43.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
        38: "https://a.cdn-hotels.com/gdcs/production24/d273/e5de0657-4fef-4317-b924-cb05bb99c6d8.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
        39: "https://a.cdn-hotels.com/gdcs/production58/d323/da9d76f0-35fa-4f8d-a9d0-8a6e24e9d03f.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
      },
    };
  },
  created() {
    http.get(`/mytrip/${this.userInfo.userId}`).then((response) => {
      this.plans = response.data.map((item) => {
        return { ...item, viewEdit: false };
      });
    });
  },
  methods: {
    deletePlan(mytripNo, idx) {
      http
        .delete(`/mytrip/plan/${mytripNo}`)
        .then((response) => {
          console.log("삭제 완료");
          console.log(response.data);
          this.plans.splice(idx, 1);
          console.log(this.plans);
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

.mytrip__title {
  font-size: 1.4rem;
  margin: 1rem 0 0 0;
  font-weight: 600;
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
  /* position: relative; */
  height: 25vw;
  width: 100rem;
  margin: 1rem 0;
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-size: cover;
  background-position: center bottom;
}

.plan__more-card {
  text-decoration: none;
  color: black;
}

#plan__title {
  font-size: 1.4rem;
  margin-top: 0.6rem;
  font-weight: 600;
  color: white;
}

#plan__period {
  font-size: 0.8rem;
  margin-top: 1.4rem;
  color: white;
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
  margin: 1rem 0;
  position: relative;
  width: 1.4rem;
  right: 3rem;
  top: 0.3rem;
  align-content: center;
}

.edit__button {
  width: 2rem;
  top: 0.3rem;
  border: 1px solid #000000;
  background-color: rgb(9, 9, 9);
  color: white;
  font-size: 6px;
  padding: 2px;
  margin: 2px;
  z-index: 4;
}

.material-symbols-outlined {
  width: 2rem;
}
</style>
