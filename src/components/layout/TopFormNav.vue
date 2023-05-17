<template>
  <div class="top-back">
    <a @click="$router.go(-1)" class="top-back__cancel">취소</a>
    <div class="top-back__title">{{ title }}</div>
    <a v-if="(mode == '디테일') & (canEdit == false)" class="top-back__submit">
      &nbsp; &nbsp; &nbsp;&nbsp;
    </a>
    <div v-else-if="(mode == '디테일') & (canEdit == true)">
      <a class="top-back__submit" @click="$parent.changeEdit()"> 수정 </a>
      <a
        class="top-back__submit"
        @click="$parent.deleteArticle()"
        style="color: #f24e1e">
        삭제
      </a>
    </div>

    <a
      v-else-if="mode == '디테일수정'"
      @click="$parent.modifyArticle()"
      class="top-back__submit"
      >등록</a
    >
    <a v-else @click="$parent.sendArticle()" class="top-back__submit">등록</a>
  </div>
</template>

<script>
export default {
  name: "TopFormNav",
  components: {},
  props: {
    title: String,
    mode: String,
    canEdit: Boolean,
  },
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
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: rgb(255, 255, 255);
  width: 100vw;
  height: 15vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: 600;
  border-bottom: solid 1px gray;
}
.top-back__cancel {
  font-size: 1rem;
  color: rgba(115, 115, 115, 0.682);
}
.top-back__title {
  font-size: 1.3rem;
}
.top-back__submit {
  font-size: 1rem;
  color: #3485ff;
  margin: 1px;
}
</style>
