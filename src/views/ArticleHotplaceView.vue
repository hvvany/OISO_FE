<template>
  <div>
    <top-back-nav :title="'핫플레이스'"></top-back-nav>
    <content>
      <button
        @click="$router.push({ name: 'hotplaceNew' })"
        class="add-article__btn">
        +
      </button>
      <div class="cards">
        <div
          v-for="(hotplace, idx) in hotplaceData"
          :key="idx"
          @click="updateCnt(hotplace)">
          <div
            v-if="hotplace.fileInfos[0]"
            class="cards__card"
            :style="
              'background-image: linear-gradient(rgba(255, 255, 255, 0),rgba(0, 0, 0, 0.35)), url(' +
              hotplace.fileInfos[0].onlinePath +
              ');'
            ">
            <h1 class="card__number">
              {{ idx + 1 }}
            </h1>
            <h2 class="card__title">{{ hotplace.title }}</h2>
            <div class="card__author">
              작성자 {{ hotplace.id }} | 작성일
              {{ hotplace.regTime.split(" ")[0] }} | 조회수
              {{ hotplace.viewCnt }} | like ▪ {{ hotplace.likeCnt }}
            </div>
          </div>
        </div>
      </div>

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
      hotplaceData: [],
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
      this.hotplaceData = response.data;
      console.log(response.data);
    });
  },
  methods: {
    openModal() {
      this.modal_show = true;
    },
    updateCnt(hotplace) {
      http
        .put(`/article/hotplace/${hotplace.articleNo}`, {
          articleNo: hotplace.articleNo,
          title: hotplace.title,
          content: hotplace.content,
          likeCnt: hotplace.likeCnt,
          viewCnt: hotplace.viewCnt + 1,
        })
        .then(({ status }) => {
          if (status == 200) {
            this.$router.push("/article/hotplace/" + hotplace.articleNo);
          }
        });
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
  width: 2.5rem;
  height: 2.5rem;
  font-size: 2rem;
  font-weight: 200;
  color: white;
  border-radius: 50%;
  background-color: #f24e1e;
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
.cards {
  display: flex;
  flex-direction: column;
}
.cards__card {
  width: 90vw;
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
  font-size: 2.6rem;
  font-weight: 700;
  color: white;
}
.card__title {
  margin-top: 3rem;
  font-size: 1.7rem;
  font-weight: 700;
  color: white;
}
.card__author {
  font-size: 0.6rem;
  text-align: start;
  margin-top: 5.5rem;
  color: white;
}
</style>
