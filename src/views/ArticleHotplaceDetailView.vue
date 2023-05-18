<template>
  <div>
    <top-back-nav :title="'핫플 디테일'"></top-back-nav>
    <h1>hotplace datail 페이지 입니다.</h1>

    <app-nav :navmode="'hotplace'"></app-nav>
    <app-footer></app-footer>
  </div>
</template>

<script>
import TopBackNav from '@/components/layout/TopBackNav.vue';
import AppNav from '@/components/layout/AppNav.vue';
export default {
  name: "hotplaceDatail",
  components: {TopBackNav, AppNav},
  props:{},
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
