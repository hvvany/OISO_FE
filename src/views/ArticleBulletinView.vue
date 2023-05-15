<template>
  <div>
    <h1>공지사항 페이지 입니다.</h1>

    <app-nav></app-nav>
  </div>
</template>

<script>
import AppNav from '@/components/layout/AppNav.vue';
export default {
  name: "BulletinView",
  components: {AppNav},
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
