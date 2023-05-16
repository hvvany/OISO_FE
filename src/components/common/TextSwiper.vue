<template>
  <swiper
    :slides-per-view="4.5"
    :loop="false"
    @swiper="onSwiper"
    @slideChange="onSlideChange">
    <swiper-slide v-for="(value, key, idx) in texts" :key="idx">
      <!-- texts는 {'관광지':12,...} 처럼 딕셔너리 구조 -->
      <a v-if="key === now_filter" class="swiper-location--selected">{{
        key
      }}</a>
      <a
        v-else
        @click="$parent.changeFilter(key)"
        class="swiper-location--unselected"
        >{{ key }}</a
      >
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper-vue2";

// Import Swiper styles
import "swiper/swiper-bundle.css";

export default {
  props: {
    texts: Object,
    now_filter: String,
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
swiper-slide {
  font-size: 0.6rem;
}
.swiper__slide-img {
  width: 100%;
}
.swiper-location--selected {
  color: #f24e1e;
  font-weight: 700;
  height: 1rem;
}
.swiper-location--unselected {
  height: 1rem;
}
</style>
