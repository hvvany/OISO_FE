<template>
  <div class="all">
    <top-back-nav :title="info.title" :type="add"></top-back-nav>

    <img :src="info.firstimage" />
    <div class="info__addr">주소: {{ info.addr1 }} {{ info.addr2 }}</div>

    <div class="info__overview" :inner-html.prop="info.overview"></div>
    <hr />
    <br />
    <div class="info__add">
      추가정보
      <!-- 지도로 위치 찍어주고 -->
      <div v-if="info.mapx && info.mapy">
        <kakao-map :location="location"></kakao-map>
      </div>
      <div v-if="info.homepage">
        <span>공식 홈페이지 </span>
        <div :inner-html.prop="info.homepage"></div>
      </div>
      <div>{{ info.tel }}</div>
    </div>
    <app-footer></app-footer>
    <app-nav></app-nav>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import http from "@/util/http-common.js";
export default {
  name: "TripInfoDetail",
  components: {
    TopBackNav: () => import("@/components/layout/TopBackNav"),
    AppNav: () => import("@/components/layout/AppNav"),
    AppFooter: () => import("@/components/layout/AppFooter"),
    KakaoMap: () => import("@/components/common/KakaoMap"),
  },
  data() {
    return {
      contentId: 0,
      contentTypeId: 0,
      sido_code: 0,
      info: [],
      location: [],
      add: "No",
    };
  },
  created() {
    this.contentId = this.$route.params.contentId;
    console.log("contentId", this.contentId);
    this.contentTypeId = this.$route.params.contentTypeId;

    const request_url =
      "https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=" +
      process.env.VUE_APP_WEATHER_KEY +
      "&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=" +
      this.contentId +
      "&contentTypeId=" +
      this.contentTypeId +
      "&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=10&pageNo=1";
    http
      .get(request_url)
      .then((response) => {
        console.log(response);
        this.info = response.data.response.body.items.item[0];
        const mapx = this.info.mapx;
        const mapy = this.info.mapy;
        this.sido_code = this.info.areacode;
        const detailInfo = { mapx, mapy };
        this.location.push(detailInfo);
      })
      .finally(() => {
        http
          .get(`/mytrip/detail/${this.userInfo.userId}/${this.contentId}`)
          .then((response) => {
            console.log(response.data);
            if (response.data == 1) {
              this.add = "Yes";
            }
          });
      });
    // http로 get해서 있는지 없는지 가져오게 해야하는데
    //그러면 백엔드 또 다 바꿔야되네 contentId랑 id랑 같은거 있으면 add 바꾸는걸로
  },
  methods: {
    addMyTrip() {
      console.log(this.sido_code);
      http
        .post(`/mytrip/${this.userInfo.userId}`, {
          id: this.userInfo.userId,
          contentId: this.contentId,
          contentTypeId: this.contentTypeId,
          sido_code: this.sido_code,
        })
        .then(({ status }) => {
          if (status == 200) {
            console.log("추가 성공");
          }
        });
      this.add = "Yes";
    },
    delMyTrip() {
      http
        .delete(`/mytrip/${this.userInfo.userId}/${this.contentId}`)
        .then((response) => {
          console.log(response.data);
          this.add = "No";
        })
        .catch((response) => {
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
.all {
  text-align: left;
}

button {
  float: right;
  margin: 4vw 2vh;
}

.info__addr {
  margin: 4vw 2vh;
  font-size: 0.8rem;
}

.info__overview {
  line-height: 1.4rem;
  margin: 4vw 2vh;
  font-size: 0.8rem;
}

.info__add {
  font-size: 0.8rem;
  margin: 4vw 2vh;
}
img {
  width: 80vw;
  display: block;
  margin: 0px auto;
}
button {
  border-width: 1px;
  border-radius: 20px;
  padding: 4px;
  margin: 8px;
  color: black;
  background-color: #f5f5f5;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
