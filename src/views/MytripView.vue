<template>
  <div>
    <h1>나의 여행 계획 페이지 입니당.</h1>
    <app-nav :navmode="'mytrip'"></app-nav>
  </div>
</template>

<script>
import AppNav from "@/components/layout/AppNav.vue";
export default {
  name: "MytripView",
  components: { AppNav },
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
