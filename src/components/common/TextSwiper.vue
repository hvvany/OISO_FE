<template>
  <div>
    <swiper
      :slides-per-view="4"
      :loop="false"
      @swiper="onSwiper"
      @slideChange="onSlideChange">
      <swiper-slide v-for="(value, key, idx) in texts" :key="idx">
        <!-- texts는 {'관광지':12,...} 처럼 딕셔너리 구조 -->
        <button>{{ key }}</button>
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
swiper {
  width: 10rem;
  height: 10rem;
}
.swiper__slide-img {
  width: 100%;
}
</style>
