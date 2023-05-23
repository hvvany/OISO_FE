<template>
  <div>
    <top-back-nav :title="'MyTrip'"></top-back-nav>
    <div v-if="detailInfo.length > 0">
      <kakao-map :location="location" type="detail"></kakao-map>
    </div>

    <content>
      <div class="cards">
        <div v-for="(value, idx) in totalInfo" :key="idx">
          <div class="cards__card">
            <span class="card__title">{{ value[0][0].title }}</span>
            <button
              class="card__delete"
              @click="deleteDetail(value[0][0].contentid)">
              삭제
            </button>
          </div>
        </div>
      </div>
    </content>
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
import { mapGetters } from "vuex";
export default {
  name: "MytripView",
  components: { AppNav, TopBackNav, AppFooter, KakaoMap }, //

  data() {
    return {
      message: "",
      info: [],
      tripInfo: [],
      detailInfo: [],
      totalInfo: [],
      location: [],
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
                this.detailInfo = [];
                this.detailInfo.push(response.data.response.body.items.item);
              })
              .finally(() => {
                this.totalInfo.push(this.detailInfo);
                this.getDetail();
              });
          }
        });
    },
    getDetail() {
      for (let test of this.detailInfo) {
        let latlng = { lat: test[0].mapy, lng: test[0].mapx };
        this.location.push(latlng);
      }
    },
    deleteDetail(contentid) {
      console.log("contentId", contentid);
      http
        .delete(`/mytrip/${this.userInfo.userId}/${contentid}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((response) => {
          console.log(response.data);
        });
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
}

button {
  width: 20%;
  border: 1px solid #989898;
  background-color: white;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12px;
}
</style>
