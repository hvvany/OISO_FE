<template>
  <div>
    <top-back-nav :title="'게시글'"></top-back-nav>
    <label>제목</label>
    <input type="text"/>
    <label>본문</label>
    <textarea>

    </textarea>
    <button>등록</button>
    <button>취소</button>
    <app-nav :navmode="'board'"></app-nav>
  </div>
</template>

<script>
import TopBackNav from "@/components/layout/TopBackNav.vue";
import AppNav from "@/components/layout/AppNav.vue";
export default {
  name: "BoardNew",
  components: { TopBackNav, AppNav },
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
