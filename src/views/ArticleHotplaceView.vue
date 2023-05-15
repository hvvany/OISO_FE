<template>
  <div>
    <h1>핫플레이스 입니당</h1>
    <app-nav :navmode="'hotplace'"></app-nav>
  </div>
</template>

<script>
import AppNav from "@/components/layout/AppNav.vue";
export default {
  name: "HotplaceView",
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
