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
      planNo: Number,
    };
  },
  created() {
    this.planNo = this.$route.params.planNo;
    console.log(this.planNo);
  },
  methods: {},
};
</script>

<style scoped></style>
