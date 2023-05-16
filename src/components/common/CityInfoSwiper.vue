<template>
  <div>
    <swiper
      :slides-per-view="1"
      :loop="false"
      @swiper="onSwiper"
      @slideChange="onSlideChange">
      <swiper-slide
        class="swiper__slide-img"
        v-for="(val, key, idx) in images"
        :key="idx">
        <div
          class="cards__card"
          :style="
            'background-image: linear-gradient(rgba(255, 255, 255, 0),rgba(0, 0, 0, 0.35)), url(' +
            val[1] +
            ');'
          ">
          <!-- <h2 class="card__title">{{ key }}</h2> -->
          <!-- <p class="card__location">{{ val[0] }}</p> -->
          <div class="weather_text">
            <div>지금 {{ val[0] }},</div>
            <div>온도,</div>
            <div>맑음</div>
          </div>
        </div>
        <!-- <div class="weather_text">
          <div>지금 {{ key }},</div>
          <div>온도,</div>
          <div>맑음</div>
        </div>
        <div class="weather_img">
          <img
            class="img"
            src="https://velog.velcdn.com/images/hvvany/post/a64ad69a-eccb-4a55-94f3-2b05ea7c55f7/image.jpeg" />
        </div> -->
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
      images: {
        감천문화마을: [
          "부산",
          "https://a.cdn-hotels.com/gdcs/production37/d1169/1dcbfef5-2070-48ce-8d62-3e0fffa21797.jpg",
        ],
        광안리: [
          "부산",
          "https://www.visitbusan.net/uploadImgs/files/cntnts/20191229160530047_oen",
        ],
        해운대: [
          "부산",
          "https://www.visitbusan.net/uploadImgs/files/cntnts/20191229153530671_oen",
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
  line-height: 3rem;
  font-size: 2rem;
}
.cards__card {
  width: 100rem;
  height: 9.6rem;
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
}
</style>
