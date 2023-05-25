<template>
  <div>
    <swiper
      :slides-per-view="1"
      :loop="false"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      :key="imgs.length">
      <swiper-slide v-for="(img, idx) in imgs" :key="idx">
        <img class="swiper__slide-img" :src="img" :alt="img" />
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
    imgs: Array,
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
  height: 8rem;
}
.swiper__slide-img {
  width: 100vw;
  height: 70vw;
}
</style>
