<template>
  <div>
    <top-back-nav :title="'MyTrip'"></top-back-nav>
    <div v-if="flag">
      <kakao-map :location="location" type="detail"></kakao-map>
    </div>

    <content>
      <draggable class="cards" @end="onDragEnd">
        <transition-group>
          <div
            v-for="(dayItems, dayIndex) in getSortedTripInfo()"
            :key="dayIndex">
            <div v-for="(val, idx) in totalInfo" :key="idx">
              <div v-if="val.contentid == dayItems.contentId">
                <div>{{ val.title }}</div>
                <div v-if="dayItems.sequence != 99">
                  <h3>Day{{ dayItems.day }} - {{ dayItems.sequence }}번</h3>
                </div>
                <div v-else>
                  <div v-if="dayItems.day != 99">
                    <h3>Day{{ dayItems.day }}</h3>
                  </div>
                  <div v-else>
                    <h3>미정</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </draggable>
    </content>

    <button class="card__modify" @click="modifyTrip">완료</button>
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
import draggable from "vuedraggable";
import { mapGetters } from "vuex";
export default {
  name: "MytripView",
  components: { AppNav, TopBackNav, AppFooter, KakaoMap, draggable }, //

  data() {
    return {
      message: "",
      info: [],
      tripInfo: [],
      detailInfo: [],
      totalInfo: [],
      location: [],
      sortedTripInfo: [],
      flag: false,
      tripdetail: this.$route.params.tripdetail,
      sido_code: this.$route.params.sido_code,
    };
  },
  created() {
    this.getInfo();
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    onDragEnd(event) {
      const updatedOrder = event.newIndex;
      console.log("Updated", updatedOrder);
      console.log(this.totalInfo);
      const offset = updatedOrder - this.totalInfo[updatedOrder].sequence;

      console.log("offset", offset);
      this.totalInfo.forEach((value, index) => {
        console.log(value);
        value.day = index + 1;
        value.sequence += offset;
      });
      console.log("drag", this.totalInfo);
    },

    //일단 db에서 계획을 가져오고
    getInfo() {
      //db에 저장된 여행 상세 정보 가져와서 공공 데이터로
      //이거 가져올 때 day로 정렬해서 가져와야겠다!
      http
        .get("/mytrip/" + this.userInfo.userId + "/" + this.sido_code)
        .then((response) => {
          this.tripInfo = response.data;

          //가져온 여행지 하나씩 돌아가면서 상세 정보 가져오기 (지도 마커 용도)
          for (let trip of this.tripInfo) {
            const request_url =
              "https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=" +
              process.env.VUE_APP_WEATHER_KEY +
              "&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=" +
              trip.contentId +
              "&contentTypeId=" +
              trip.contentTypeId +
              "&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=10&pageNo=1";

            http
              .get(request_url)
              .then((response) => {
                // console.log("짠", response.data.response.body.items.item[0]);
                const item = response.data.response.body.items.item[0];
                const title = item.title;
                const contentid = item.contentid;
                const mapx = item.mapx;
                const mapy = item.mapy;
                this.detailInfo = { title, contentid, mapx, mapy };
              })
              .finally(() => {
                this.totalInfo.push(this.detailInfo);
                this.getDetail();
              });
          }
        });
    },
    getDetail() {
      let latlng = { lat: this.detailInfo.mapy, lng: this.detailInfo.mapx };
      this.location.push(latlng);
      this.flag = true;
    },
    //day, sequence 기준 정렬
    getSortedTripInfo() {
      const sortedTripInfo = [...this.tripInfo];
      sortedTripInfo.sort((a, b) => {
        if (a.day === b.day) {
          return a.sequence - b.sequence;
        } else {
          return a.day - b.day;
        }
      });

      return sortedTripInfo;
    },
    deleteDetail(contentid) {
      http
        .delete(`/mytrip/${this.userInfo.userId}/${contentid}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((response) => {
          console.log(response.data);
        });
    },
    modifyTrip() {
      console.log("modify", this.totalInfo);
      http
        .post(`/mytrip/${this.userInfo.userId}/${this.sido_code}`, {
          totalInfo: this.totalInfo,
        })
        .then((response) => {
          // Handle the server response if needed
          console.log(response);
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error("Error updating list order:", error);
        });
    },
    getTitleById(contentId) {
      for (const items of this.totalInfo) {
        for (const item of items) {
          if (item.contentid === String(contentId)) {
            return item.title;
          }
        }
      }
      return "Title not found";
    },
  },
};
</script>

<style scoped>
content {
  padding: 0 1rem;
  display: flex;
  justify-content: center;
}

.cards {
  display: flex;
  flex-direction: column;
}

.cards__card {
  width: 90vw;
  height: 4rem;
  padding: 1rem;
  margin: 0.5rem;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px rgba(128, 128, 128, 0.29);
  background-repeat: no-repeat;
  background-size: cover;
  background-color: white;
  /* 자식 요소 수직 가운데 정렬 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

button {
  width: 20%;
  border: 1px solid #989898;
  background-color: white;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12px;
}

.card__modify {
  width: 15%;
  color: rgb(22, 116, 22);
  font-size: 16px;
}

.day-divider {
  border-top: 1px solid #ccc;
  margin: 10px 0;
  padding-top: 10px;
}
</style>
