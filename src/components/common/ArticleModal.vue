<template>
  <div class="modal__background">
    <div class="modal">
      <div class="modal__header">게시글 검색</div>
      <div class="modal__body">
        <div class="search__input">
          <input
            type="text"
            placeholder="검색어 입력..."
            class="form-control"
            v-model="search_keyword" />
        </div>
      </div>
      <div class="moda__footer">
        <button type="button" @click="search()">검색</button>
        <button type="button" @click="$emit('close')">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleModal",
  components: {},
  data() {
    return {
      message: "",
      search_keyword: "",
    };
  },
  created() {},
  methods: {
    search() {
      this.$parent.closeModal(this.search_keyword);
    },
  },
};
</script>

<style scoped>
.modal__background {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  backdrop-filter: blur(3px);
}

.modal {
  position: fixed;
  top: 50vw;
  left: 10vw;
  width: 80vw;
  height: 20vh;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 2px rgba(128, 128, 128, 0.29);
  z-index: 5;
  background-color: rgba(255, 255, 255);
}

.modal__header {
  margin: 4vw;
}
.modal__body {
  margin: 2vw;
}

input {
  width: 80%;
  border: 1px solid #989898;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
}

button {
  width: 25%;
  border: 1px solid #989898;
  background-color: white;
  border-radius: 8px;
  padding: 10px 12px;
  margin: 0px 10px;
  font-size: 12px;
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
