<template>
  <div>
    <top-back-nav :title="'MyTrip'"></top-back-nav>
    <div v-if="sortTripInfo.length == size">
      <kakao-map
        ref="kakaoMap"
        :location="kakaoInfo"
        :center="center"
        type="detail"></kakao-map>
    </div>
    <content>
      <ul>
        <draggable
          class="cards"
          v-model="sortTripInfo"
          :options="dragOptions"
          @end="onDragEnd">
          <transition-group>
            <div v-for="(dayItems, dayIndex) in sortTripInfo" :key="dayIndex">
              <li v-for="(item, idx) in totalInfo" :key="idx">
                <div v-if="dayItems.contentId == item.contentid">
                  <div class="cards__card" @click="moveMap(item)">
                    {{ dayIndex + 1 }}. {{ item.title }}
                  </div>
                </div>
              </li>
            </div>
          </transition-group>
        </draggable>
      </ul>
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
      tripInfo: [],
      kakaoInfo: [],
      detailInfo: [],
      totalInfo: [],
      location: [],
      sortTripInfo: [],
      sido_code: this.$route.params.sido_code,
      startPeriod: this.$route.params.startPeriod,
      endPeriod: this.$route.params.endPeriod,
      dragOptions: {
        animation: 150,
        onEnd: this.onDragEnd,
      },
      sequence: 1,
      size: 0,
      center: {},
    };
  },
  created() {
    this.getInfo();
  },
  mounted() {
    // this.updateMap();
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    onDragEnd(event) {
      const draggedItem = this.sortTripInfo[event.oldIndex];
      console.log("자", draggedItem, event.oldIndex, event.newIndex);
      this.sortTripInfo.splice(event.oldIndex, 1);
      this.sortTripInfo.splice(event.newIndex + 1, 0, draggedItem);
      this.updateMap();
    },
    updateMap() {
      console.log("refs", this.$refs.kakaoMap);
      const newOrder = this.sortTripInfo.map((dayItems) => dayItems);
      console.log("new", newOrder);
      this.kakaoInfo = newOrder;
    },
    moveMap(item) {
      this.center = { lat: item.mapy, lng: item.mapx };
    },
    //일단 db에서 계획을 가져오고
    getInfo() {
      //db에 저장된 여행 상세 정보 가져와서 공공 데이터로
      http
        .get("/mytrip/" + this.userInfo.userId + "/" + this.sido_code)
        .then((response) => {
          this.tripInfo = response.data;
          this.size = this.tripInfo.length;

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
                const item = response.data.response.body.items.item[0];
                const title = item.title;
                const contentid = item.contentid;
                const mapx = item.mapx;
                const mapy = item.mapy;
                this.detailInfo = { ...trip, title, contentid, mapx, mapy };
              })
              .finally(() => {
                this.totalInfo.push(this.detailInfo);
                this.kakaoInfo.push(this.detailInfo);
                console.log("finally", this.kakaoInfo);
                this.getSortedTripInfo();
              });
          }
        });
    },
    //sequence 기준 정렬
    getSortedTripInfo() {
      const sortedTripInfo = [...this.kakaoInfo];
      sortedTripInfo.sort((a, b) => {
        return a.sequence - b.sequence;
      });
      this.sortTripInfo = sortedTripInfo;
      console.log("sort", this.sortTripInfo);
    },
    modifyTrip() {
      let idx = 0;
      for (let info of this.sortTripInfo) {
        info.sequence = idx++;
        http
          .put(`/mytrip/${info.detailNo}/${idx}`, {})
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error("Error", error);
          });
      }
    },
  },
};
</script>

<style scoped>
content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

h3 {
  margin-top: 0.5rem;
}

.cards {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
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
  align-items: center;
  font-size: 14px;
  line-height: 1.4rem;
  text-align: left;
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
  width: 20%;
  color: rgb(22, 116, 22);
  font-size: 16px;
}

.day-divider {
  border-top: 1px solid #ccc;
  margin: 10px 0;
  padding-top: 10px;
}
</style>
