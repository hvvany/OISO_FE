<template>
  <div>
    <top-back-nav :title="'MyTrip'"></top-back-nav>
    <kakao-map></kakao-map>
    <app-nav :navmode="'mytrip'"></app-nav>
  </div>
</template>

<script>
import AppNav from "@/components/layout/AppNav.vue";
import TopBackNav from "@/components/layout/TopBackNav.vue";
import KakaoMap from "@/components/common/KakaoMap.vue";
export default {
  name: "MytripView",
  components: { AppNav, TopBackNav, KakaoMap },
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
