<template>
  <div>
    <top-back-nav :title="'게시판'"></top-back-nav>
    <content>
      <button
        @click="openModal"
        class="search-article__btn material-symbols-outlined">
        search
      </button>
      <button
        @click="$router.push({ name: 'boardnew' })"
        class="add-article__btn">
        +
      </button>
      <div class="cards" v-for="(board, idx) in boardData" :key="idx">
        <div class="cards__card" @click="updateCnt(board)">
          <div class="card__imgs">
            <img
              v-if="board.fileInfos[0]"
              class="card__img"
              :src="board.fileInfos[0].onlinePath" />
          </div>
          <div class="card__author">
            작성자 ▪ {{ board.id }} | 작성일 ▪
            {{ board.regTime.split(" ")[0] }} | 조회수 ▪ {{ board.viewCnt }}
          </div>
          <h2 class="card__title">{{ board.title }}</h2>
          <p class="card__content">
            {{ board.content | showFirstLine }}
          </p>
        </div>
      </div>

      <!-- 모달창 -->
      <article-modal
        v-show="modal_show"
        @close="closeModal('')"></article-modal>
    </content>
    <app-footer></app-footer>
    <app-nav :navmode="'board'"></app-nav>
  </div>
</template>

<script>
import http from "@/util/http-common";
import AppNav from "@/components/layout/AppNav.vue";
import TopBackNav from "@/components/layout/TopBackNav.vue";
import ArticleModal from "@/components/common/ArticleModal.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
export default {
  name: "BoardView",
  components: { AppNav, TopBackNav, ArticleModal, AppFooter },
  data() {
    return {
      message: "",
      modal_show: false,
      boardData: [],
      afterMounted: "",
    };
  },
  created() {
    http.get("/article/board/").then((response) => {
      this.boardData = response.data;
      console.log(response.data);
    });
  },
  methods: {
    openModal() {
      this.modal_show = true;
    },
    closeModal(search_keyword) {
      this.modal_show = false;
      //전체 목록 불러오기
      if (search_keyword != "") {
        http.get("/article/board/").then((response) => {
          this.boardData = response.data;
          //KMP 알고리즘
          let test = {};
          let idx = 0;
          for (let info of this.boardData) {
            if (this.$kmpSearch(info.title, search_keyword).length > 0) {
              console.log(info);
              test[idx++] = info;
            }
          }
          this.boardData = test;
        });
      }
    },
    updateCnt(board) {
      http
        .put(`/article/board/${board.articleNo}`, {
          articleNo: board.articleNo,
          title: board.title,
          content: board.content,
          likeCnt: board.likeCnt,
          viewCnt: board.viewCnt + 1,
        })
        .then(({ status }) => {
          if (status == 200) {
            this.$router.push("/article/board/" + board.articleNo);
          }
        });
    },
  },
};
</script>

<style scoped>
content {
  padding: 0 1rem;
}
.add-article__btn {
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
}

.search-article__btn {
  position: fixed;
  right: 1rem;
  bottom: 8rem;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.4rem;
  color: white;
  border-radius: 50%;
  background-color: #8d68f3;
  border: solid 0;
  box-shadow: 2px 2px 2px 1px rgba(128, 128, 128, 0.29);
}

.cards__card {
  padding: 1rem;
  margin: 0 0 1rem 0;
  border-radius: 5px;
  background-color: white;
}
.card__author {
  font-size: 0.7rem;
  text-align: start;
  margin: 1rem;
}
.card__title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 1rem;
  text-align: start;
}
.card__content {
  font-size: 0.9rem;
  text-align: start;
  padding: 0 1rem;
  margin: 1rem 0;
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;
  overflow: hidden;
}
.card__img {
  width: 100%;
  border-radius: 5px;
}
</style>
