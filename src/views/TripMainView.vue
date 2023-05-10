<template>
  <div>
    <h1>TripMain 페이지</h1>
    <app-nav></app-nav>
  </div>
</template>

<script>
import AppNav from '@/components/layout/AppNav.vue';
export default {
  name: 'TripMain',
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