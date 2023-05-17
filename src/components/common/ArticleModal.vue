<template>
  <div class="modal__background">
    <div class="modal">
      <div class="modal__header">게시글 검색</div>
      <div class="modal__body">
        <div class="mb-3">
          <input
            type="text"
            placeholder="검색어 입력..."
            v-model="search_keyword" />
        </div>
      </div>
      <div class="moda__footer">
        <button type="button" @click="search()">검색</button>
        <button type="button" @click="$emit('close')">취소</button>
      </div>
    </div>
  </div>
  <!-- <div class="modal__background">
    <div class="modal">
      <div class="modal__header">게시글 검색</div>
      <div class="modal__body">
        <div class="mb-3">
          <input type="text" placeholder="검색어 입력..." />
        </div>
      </div>
      <div class="moda__footer">
        <button type="button" @click="$emit('resolve')">검색</button>
        <button type="button" @click="$emit('close')">취소</button>
      </div>
    </div>
  </div> -->
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
  margin: 4vw;
}
.modal__footer {
  margin: 4vw;
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
