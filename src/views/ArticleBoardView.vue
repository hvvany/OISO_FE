<template>
  <div>
    <top-back-nav :title="'게시판'"></top-back-nav>
    <h1>게시판 페이지 입니당</h1>
    <app-nav :navmode="'board'"></app-nav>
  </div>
</template>

<script>
import AppNav from "@/components/layout/AppNav.vue";
import TopBackNav from "@/components/layout/TopBackNav.vue";
export default {
  name: "BoardView",
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
