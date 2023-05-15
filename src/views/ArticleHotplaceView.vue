<template>
  <div>
    <top-back-nav :title="'핫플레이스'"></top-back-nav>
    <h1>핫플레이스 입니당</h1>
    <app-nav :navmode="'hotplace'"></app-nav>
  </div>
</template>

<script>
import AppNav from "@/components/layout/AppNav.vue";
import TopBackNav from "@/components/layout/TopBackNav.vue";
export default {
  name: "HotplaceView",
  components: { AppNav, TopBackNav },
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
