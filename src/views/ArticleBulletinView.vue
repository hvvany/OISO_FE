<template>
  <div>
    <div class="top-back">
      <div @click="$router.go(-1)" class="top-back__arrow material-symbols-outlined">arrow_back</div>
      <div>공지사항</div>
    </div>
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
export default {
  name: "BulletinView",
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

<style scoped>
.top-back {
  position:sticky;
  top: 0;
  z-index: 2;
  background-color: rgb(255, 255, 255);
  width: 100vw;
  display: flex;
  align-items: center;
  padding: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
  border-bottom:solid 1px gray;
}
.top-back__arrow {
  font-size: 2rem;
  padding: 0 1rem;
}

.content-list {
  padding: 0 1.5rem;
}
.content-list__item{
  padding: 1rem;
  border-bottom: solid 1px gray;
}
</style>
