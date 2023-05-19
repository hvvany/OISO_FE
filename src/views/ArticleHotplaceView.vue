<template>
  <div>
    <top-back-nav :title="'핫플레이스'"></top-back-nav>
    <content>
      <!-- <button
        @click="openModal"
        class="search-article__btn material-symbols-outlined">
        search
      </button>
      <button
        @click="$router.push({ name: 'hotplacenew' })"
        class="add-article__btn">
        +
      </button> -->
      <div class="cards" v-for="(board, idx) in boardData" :key="idx">
        <div
          class="cards__card"
          @click="$router.push('/article/hotplace/' + board.articleNo)">
          <div class="card__author">
            작성자 ▪ {{ board.id }} | 작성일 ▪ {{ board.regTime.split(" ")[0] }}
          </div>
          <h2 class="card__title">{{ board.title }}</h2>
          <p class="card__content">
            {{ board.content | showFirstLine }}
          </p>
          <div class="card__imgs">
            <img
              class="card__img"
              src="data:image/jpeg;base64,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" />
          </div>
        </div>
      </div>

      <!-- 사진때문에 두고 간다... -->
      <!-- <div class="cards">
        <div
          v-for="(val, key, idx) in images"
          :key="idx"
          class="cards__card"
          :style="
            'background-image: linear-gradient(rgba(255, 255, 255, 0),rgba(0, 0, 0, 0.35)), url(' +
            val[1] +
            ');'
          "
          @click="$router.push('/article/hotplace/' + key)">
          <h1 class="card__number">
            {{ idx + 1 }}
          </h1>
          <h2 class="card__title">{{ key }}</h2>
          <p class="card__location">{{ val[0] }}</p>
        </div>
      </div> -->

      <!-- 모달창 -->
      <article-modal v-show="modal_show"></article-modal>
    </content>
    <app-footer></app-footer>
    <app-nav :navmode="'hotplace'"></app-nav>
  </div>
</template>

<script>
import http from "@/util/http-common";
import AppNav from "@/components/layout/AppNav.vue";
import TopBackNav from "@/components/layout/TopBackNav.vue";
import ArticleModal from "@/components/common/ArticleModal.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
export default {
  name: "HotplaceView",
  components: { AppNav, TopBackNav, ArticleModal, AppFooter },
  data() {
    return {
      message: "",
      boardData: [],
      modal_show: false,
      images: {
        감천문화마을: [
          "부산",
          "https://a.cdn-hotels.com/gdcs/production37/d1169/1dcbfef5-2070-48ce-8d62-3e0fffa21797.jpg",
        ],
        광안리: [
          "부산",
          "https://www.visitbusan.net/uploadImgs/files/cntnts/20191229160530047_oen",
        ],
        해운대: [
          "부산",
          "https://www.visitbusan.net/uploadImgs/files/cntnts/20191229153530671_oen",
        ],
      },
    };
  },
  created() {
    http.get("/article/hotplace/").then((response) => {
      this.boardData = response.data;
      console.log(response.data);
    });
  },
  methods: {
    openModal() {
      this.modal_show = true;
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
  margin: 0 0.5rem 1rem 0.5rem;
  border-radius: 5px;
  background-color: white;
  box-shadow: 2px 2px 2px 1px rgba(128, 128, 128, 0.29);
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
  width: 90%;
}
</style>
