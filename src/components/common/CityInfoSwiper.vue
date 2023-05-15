<template>
  <div>
    <swiper
      :slides-per-view="1"
      :loop="false"
      @swiper="onSwiper"
      @slideChange="onSlideChange">
      <swiper-slide class="test" v-for="(value, key, idx) in texts" :key="idx">
        <div class="weather_text">
          <div>지금 {{ key }},</div>
          <div>온도,</div>
          <div>맑음</div>
        </div>
        <div class="weather_img">
          <img
            class="img"
            src="https://velog.velcdn.com/images/hvvany/post/a64ad69a-eccb-4a55-94f3-2b05ea7c55f7/image.jpeg" />
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
    texts: Object,
  },
  components: {
    Swiper,
    SwiperSlide,
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
.test {
  width: 100rem;
  height: 11rem;
  background-color: rgb(147, 182, 249);
  color: aliceblue;
  text-align: left;
  line-height: 3rem;
  padding: 1rem;
  font-size: 2rem;
}
.weather_text {
  float: left;
}
.weather_img {
  float: right;
}
.img {
  width: 9rem;
}
</style>
