<template>
  <div>
    <top-form-nav :title="'핫플 등록'"></top-form-nav>

    <app-footer></app-footer>
    <app-nav :navmode="'hotplace'"></app-nav>
  </div>
</template>

<script>
import TopFormNav from "@/components/layout/TopFormNav.vue";
import AppNav from "@/components/layout/AppNav.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
export default {
  name: "hotplaceNew",
  components: { TopFormNav, AppNav, AppFooter },
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
