<template>
  <div>
    <top-back-nav :title="'공지사항'"></top-back-nav>
    <ul class="content-list">
      <li class="content-list__item">
        <p>공지사항 title</p>
        <p>2023-05-15</p>
      </li>
      <li class="content-list__item">
        <p>공지사항 title</p>
        <p>2023-05-15</p>
      </li>
      <li class="content-list__item">
        <p>공지사항 title</p>
        <p>2023-05-15</p>
      </li>
      <li class="content-list__item">
        <p>공지사항 title</p>
        <p>2023-05-15</p>
      </li>
      <li class="content-list__item">
        <p>공지사항 title</p>
        <p>2023-05-15</p>
      </li>
      <li class="content-list__item">
        <p>공지사항 title</p>
        <p>2023-05-15</p>
      </li>
      <li class="content-list__item">
        <p>공지사항 title</p>
        <p>2023-05-15</p>
      </li>
      <li class="content-list__item">
        <p>공지사항 title</p>
        <p>2023-05-15</p>
      </li>
      <li class="content-list__item">
        <p>공지사항 title</p>
        <p>2023-05-15</p>
      </li>
      <li class="content-list__item">
        <p>공지사항 title</p>
        <p>2023-05-15</p>
      </li>
      <li class="content-list__item">
        <p>공지사항 title</p>
        <p>2023-05-15</p>
      </li>
      <li class="content-list__item">
        <p>공지사항 title</p>
        <p>2023-05-15</p>
      </li>
    </ul>
    <div></div>
    <app-nav></app-nav>
  </div>
</template>

<script>
import AppNav from "@/components/layout/AppNav.vue";
import TopBackNav from "@/components/layout/TopBackNav.vue";
export default {
  name: "BulletinView",
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

<style scoped>
.content-list {
  padding: 0 1.5rem;
}
.content-list__item {
  padding: 1rem;
  border-bottom: solid 1px gray;
}
</style>
