<template>
  <div class="top-back">
    <a
      v-if="mode == '디테일수정'"
      @click="$router.go(-1)"
      class="top-back__cancel"
      >취소</a
    >
    <a
      v-else
      @click="$router.go(-1)"
      class="top-back__arrow material-symbols-outlined"
      >arrow_back</a
    >
    <div class="top-back__title">{{ title }}</div>
    <a v-if="(mode == '디테일') & (canEdit == false)" class="top-back__submit">
      &nbsp; &nbsp; &nbsp;&nbsp;
    </a>
    <div
      v-else-if="(mode == '디테일') & (canEdit == true)"
      class="top-back__module">
      <a class="top-back__submit" @click="$parent.changeEdit()"
        ><span class="material-symbols-outlined"> edit </span></a
      >
      <a class="top-back__submit" @click="$parent.deleteArticle()">
        <span class="material-symbols-outlined"> delete </span>
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
  height: 3.7rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: 600;
  border-bottom: solid 1px gray;
  padding: 0.7rem;
}
.material-symbols-outlined {
  color: gray;
}
.top-back__cancel {
  font-size: 0.8rem;
  color: rgba(115, 115, 115, 0.682);
}
.top-back__arrow {
  font-size: 1.6rem;
  padding: 0 0.5rem;
}
.top-back__title {
  font-size: 1rem;
  width: 60%;
}
.top-back__submit {
  font-size: 0.8rem;
  color: #3485ff;
  margin: 1px;
}
</style>
