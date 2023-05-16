<template>
  <div>
    <top-back-nav :title="'핫플레이스'"></top-back-nav>
    <content>
      <button
        @click="$router.push('/article/board/new')"
        class="add-article__btn">
        +
      </button>
      <div class="cards">
        <div
          v-for="(val, key, idx) in images"
          :key="idx"
          class="cards__card"
          :style="
            'background-image: linear-gradient(rgba(255, 255, 255, 0),rgba(0, 0, 0, 0.35)), url(' +
            val[1] +
            ');'
          ">
          <h1 class="card__number">{{ idx + 1 }}</h1>
          <h2 class="card__title">{{ key }}</h2>
          <p class="card__location">{{ val[0] }}</p>
        </div>
      </div>

      <!-- 모달창 -->
      <article-modal v-show="modal_show"></article-modal>
    </content>
    <app-nav :navmode="'hotplace'"></app-nav>
  </div>
</template>

<script>
import AppNav from "@/components/layout/AppNav.vue";
import TopBackNav from "@/components/layout/TopBackNav.vue";
import ArticleModal from "@/components/common/ArticleModal.vue";
export default {
  name: "BoardView",
  components: { AppNav, TopBackNav, ArticleModal },
  data() {
    return {
      message: "",
      modal_show: false,
      images: {
        '감천문화마을':
          ["부산","https://a.cdn-hotels.com/gdcs/production37/d1169/1dcbfef5-2070-48ce-8d62-3e0fffa21797.jpg"],
        '광안리':
          ["부산","https://www.visitbusan.net/uploadImgs/files/cntnts/20191229160530047_oen"],
        '해운대':
          ['부산','https://www.visitbusan.net/uploadImgs/files/cntnts/20191229153530671_oen']
      },
    };
  },
  created() {},
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
  display: flex;
  justify-content: center;
}
.add-article__btn {
  position: fixed;
  right: 1rem;
  bottom: 5rem;
  width: 2.7rem;
  height: 2.7rem;
  font-size: 2rem;
  font-weight: 200;
  color: white;
  border-radius: 50%;
  background-color: #f24e1e;
  border: solid 0;
  box-shadow: 2px 2px 2px 1px rgba(128, 128, 128, 0.29);
}
.cards {
  display: flex;
  flex-direction: column;
}
.cards__card {
  width: 20rem;
  height: 15rem;
  padding: 1rem;
  margin: 1rem 0.5rem 1rem 0.5rem;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 1px rgba(128, 128, 128, 0.29);
  background-repeat: no-repeat;
  background-size: cover;
  
}
.card__number {
  text-align: start;
  font-size: 3rem;
  font-weight: 700;
  color: white;
}
.card__title {
  margin-top: 4rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}
.card__location{
  margin-top: 3rem;
  color: white;
  text-align: start;
}
</style>
