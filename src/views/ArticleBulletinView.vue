<template>
  <div>
    <top-back-nav :title="'공지사항'"></top-back-nav>
    <ul class="content-list" v-for="(bulletin, idx) in bulletinData" :key="idx">
      <li class="content-list__item" @click="updateCnt(bulletin)">
        <p class="list--title">{{ bulletin.title }}</p>
        <div class="list--time">
          {{ bulletin.regTime }} | 조회수 {{ bulletin.viewCnt }} | like
          {{ bulletin.likeCnt }}
        </div>
      </li>
    </ul>
    <button
      @click="$router.push({ name: 'bulletinNew' })"
      class="add-article__btn">
      +
    </button>
    <app-footer></app-footer>
    <app-nav></app-nav>
  </div>
</template>

<script>
import http from "@/util/http-common";
import AppNav from "@/components/layout/AppNav.vue";
import TopBackNav from "@/components/layout/TopBackNav.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
export default {
  name: "BulletinView",
  components: { AppNav, TopBackNav, AppFooter },
  data() {
    return {
      message: "",
      bulletinData: [],
    };
  },
  created() {
    http.get("/article/bulletin/").then((response) => {
      this.bulletinData = response.data;
      console.log(response.data);
    });
  },
  methods: {
    updateCnt(bulletin) {
      http
        .put(`/article/bulletin/${bulletin.articleNo}`, {
          articleNo: bulletin.articleNo,
          title: bulletin.title,
          content: bulletin.content,
          likeCnt: bulletin.likeCnt,
          viewCnt: bulletin.viewCnt + 1,
        })
        .then(({ status }) => {
          if (status == 200) {
            this.$router.push("/article/bulletin/" + bulletin.articleNo);
          }
        });
    },
  },
};
</script>

<style scoped>
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
.content-list {
  padding: 0 1.5rem;
}
.content-list__item {
  text-align: start;
  padding: 0.5rem;
  border-bottom: solid 1px gray;
}
.list--title {
  margin: 0.5rem 0;
  font-weight: 700;
}
.list--time {
  font-size: 0.8rem;
  margin: 0.5rem 0;
  color: rgb(131, 131, 131);
}
</style>
