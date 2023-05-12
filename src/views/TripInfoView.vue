<template>
  <div>
    <h1>지역별 관광지 검색 페이지</h1>
    <app-nav></app-nav>
  </div>
</template>

<script>
import AppNav from '@/components/layout/AppNav.vue';
export default {
  name: 'TripInfo',
  components: {AppNav},
  data() {
    return {
      message: '',
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>