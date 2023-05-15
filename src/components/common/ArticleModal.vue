<template>
  <div class="modal">
    <div class="modal__header">모달 헤드</div>
    <div class="modal__body">모달 바디</div>
    <div class="modal__footer">모달 푸터</div>
  </div>
</template>

<script>
export default {
  name: "ArticleModal",
  components: {},
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
.modal {
  position: fixed;
  top: 15vh;
  left: 5vw;
  width: 90vw;
  height: 70vh;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 2px rgba(128, 128, 128, 0.29);
  z-index: 5;
  background-color: rgb(255, 255, 255);
}

/* 모달 버튼 css 저장 */
/* .add-article__btn {
  position: fixed;
  right: 1rem;
  bottom: 5rem;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 2rem;
  font-weight: 200;
  color: white;
  border-radius: 50%;
  background-color: #3485ff;
  border: solid 0;
  box-shadow: 2px 2px 2px 1px rgba(128, 128, 128, 0.29);
} */
</style>
