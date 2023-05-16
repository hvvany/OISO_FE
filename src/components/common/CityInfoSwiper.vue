<template>
  <div>
    <swiper
      :slides-per-view="1"
      :loop="false"
      @swiper="onSwiper"
      @slideChange="onSlideChange">
      <swiper-slide
        class="swiper__slide-img"
        v-for="(val, key, idx) in weather"
        :key="idx">
        <div class="cards__card">
          <!-- <div class="weather_text">
            <div>지금 {{ val[0] }}의</div>
            <div>온도는 {{ val[1] }}℃</div>
            <div style="font-size: 1rem">
              최저 {{ val[2] }}℃, 최고 {{ val[3] }}℃
            </div>
          </div> -->
          <!-- 이거는 db에서 해서 해당 사진을 들고오거나/ 안 바뀌니까 img에 넣어둬도 될 것 같고 -->
          <!-- <div>하늘은 {{ val[4] }} + {{ val[5] }}</div> -->

          <!-- 아니면 밑에 버전으로 해서 깔끔하게 이모티콘으로 지금 하늘 표시해도 될 것 같고? -->
          <div class="weather_text">
            <div>지금 {{ val[0] }}의</div>
            <div>온도는 {{ val[1] }}℃</div>
            <div style="font-size: 1rem">
              최저 {{ val[2] }}℃, 최고 {{ val[3] }}℃
            </div>
          </div>
          <div class="weather_img">
            <img
              class="img"
              src="https://velog.velcdn.com/images/hvvany/post/a64ad69a-eccb-4a55-94f3-2b05ea7c55f7/image.jpeg" />
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper-vue2";

// Import Swiper styles
import "swiper/swiper-bundle.css";

export default {
  props: {
    // texts: Object,
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      weather: {
        감천문화마을: [
          "서울",
          19, //1시간 기온
          27, //최저 기온
          14, //최고 기온
          1, //하늘 상태
          0, //강수 상태
          "https://media.istockphoto.com/id/1007768414/ko/%EC%82%AC%EC%A7%84/%EB%B0%9D%EC%9D%80-%ED%83%9C%EC%96%91%EA%B3%BC-%EA%B5%AC%EB%A6%84%EA%B3%BC-%ED%91%B8%EB%A5%B8-%ED%95%98%EB%8A%98.jpg?b=1&s=170667a&w=0&k=20&c=6NhhjASHzk5ENQz8hUUL8F1Nh0HTcN1611VcyZDhr2g=",
        ],
        해운대: [
          "부산",
          19,
          27,
          14,
          1,
          0,
          "https://www.visitbusan.net/uploadImgs/files/cntnts/20191229153530671_oen",
        ],
        광안리: [
          "울산",
          19,
          27,
          14,
          1,
          0,
          "https://images.unsplash.com/photo-1558486012-817176f84c6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8d2VhdGhlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1200&q=60",
        ],
        애월: [
          "제주도",
          19,
          27,
          14,
          1,
          0,
          "https://images.unsplash.com/photo-1534794048419-48e110dca88e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHdlYXRoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=1200&q=60",
        ],
      },
    };
  },
  methods: {
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log("slide change");
    },
  },
};
</script>
<style scoped>
.swiper__slide-img {
  width: 100rem;
  height: 10rem;
  color: aliceblue;
  text-align: left;
  line-height: 2.4rem;
  font-size: 1.6rem;
}
.cards__card {
  width: 100vw;
  height: 9.6rem;
  background-color: gray;
}
.weather_text {
  float: left;
  margin-left: 1rem;
}
.weather_img {
  float: right;
}

.img {
  width: 9rem;
  height: 9rem;
}
</style>
