<template>
  <div>
    <h1>게시판 페이지 입니당</h1>
    <app-nav :navmode="'board'"></app-nav>
  </div>
</template>

<script>
import AppNav from "@/components/layout/AppNav.vue";
export default {
  name: "BoardView",
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
