<template>
  <div class="top-back">
    <a @click="$router.go(-1)" class="top-back__cancel">취소</a>
    <div class="top-back__title">{{ title }}</div>
    <a @click="부모함수;" class="top-back__submit">등록</a>
  </div>
</template>

<script>
export default {
  name: "TopFormNav",
  components: {},
  props: {
    title: String,
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
}
</style>
