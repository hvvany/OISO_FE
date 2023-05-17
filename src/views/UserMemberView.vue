<template>
  <div>
    <top-back-nav :title="'멤버 관리'"></top-back-nav>
    <h1>멤버 관리 페이지</h1>
    <app-nav></app-nav>
  </div>
</template>

<script>
import http from "@/util/http-common"
import TopBackNav from "@/components/layout/TopBackNav.vue";
import AppNav from "@/components/layout/AppNav.vue";
export default {
  name: "userMember",
  components: { TopBackNav, AppNav },
  data() {
    return {
      message: "",
    };
  },
  created() {
    http.get('/user/member')
  },
  methods: {},
};
</script>

<style scoped></style>
