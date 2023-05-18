<template>
  <div>
    <div v-if="!editMode">
      <top-form-nav
        :title="'게시글 조회'"
        :mode="'디테일'"
        :canEdit="canEdit"></top-form-nav>
      <div class="title">
        <span class="space__title">{{ content_title }}</span>
      </div>
      <div class="title">
        <span class="space__author">{{ content_author }}</span>
        <span class="space__regTime">{{ content_regTime }}</span>
      </div>

      <textarea class="input__text" v-model="content_text" readonly></textarea>
    </div>

    <div v-else>
      <top-form-nav
        :title="content_title"
        :mode="'디테일수정'"
        :canEdit="canEdit"></top-form-nav>
      <input class="input__title" type="text" v-model="content_title" />
      <textarea class="input__text" v-model="content_text"></textarea>
    </div>

    <app-footer></app-footer>
    <app-nav :navmode="'board'"></app-nav>
  </div>
</template>

<script>
// import editor plugins

import http from "@/util/http-common";
import TopFormNav from "@/components/layout/TopFormNav.vue";
import AppNav from "@/components/layout/AppNav.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import { mapGetters } from "vuex";
export default {
  name: "BoardNew",
  components: { TopFormNav, AppNav, AppFooter },
  data() {
    return {
      content_title: "",
      content_text: "",
      content_author: "",
      content_regTime: "",
      editMode: false,
      canEdit: false,
      articleNo: 0,
    };
  },
  created() {
    http
      .get("/article/board/" + this.$route.params.articleNo)
      .then((response) => {
        const boardData = response.data;
        console.log(response.data);
        this.content_title = boardData.title;
        this.content_text = boardData.content;
        this.articleNo = boardData.articleNo;
        this.content_author = boardData.id;
        this.content_regTime = boardData.regTime;
        if (this.userInfo.userId === boardData.id) {
          this.canEdit = true;
          console.log(this.canEdit);
        }
      });
  },
  mounted() {},
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    changeEdit() {
      this.editMode = !this.editMode;
    },
    sendArticle() {
      console.log(this);
      if ((this.content_text != "") & (this.content_title != "")) {
        http
          .post("/article/board/new", {
            id: this.userInfo.userId,
            title: this.content_title,
            content: this.content_text,
          })
          .then(({ status }) => {
            if (status == 200) {
              this.$router.push({ name: "board" });
            }
          });
      } else {
        alert("정보를 입력해 주세요");
      }
    },
    modifyArticle() {
      console.log(this);
      if ((this.content_text != "") & (this.content_title != "")) {
        http
          .put(`/article/board/${this.articleNo}`, {
            articleNo: this.articleNo,
            title: this.content_title,
            content: this.content_text,
          })
          .then(({ status }) => {
            if (status == 200) {
              this.$router.push({ name: "board" });
            }
          });
      } else {
        alert("정보를 입력해 주세요");
      }
    },
    deleteArticle() {
      http
        .delete("/article/board/" + this.$route.params.articleNo)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "board" });
        });
    },
  },
};
</script>

<style scoped>
.input__title {
  width: 80vw;
  border-radius: 20px;
  border-width: 1px;
  height: 3rem;
  padding: 0 1rem;
  margin: 1rem;
}

.title {
  height: 2rem;
  margin: 0 1.4rem;
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
}
.space__title {
  font-size: 1.1rem;
}

.space__author,
.space__regTime {
  font-size: 0.8rem;
}

.input__text {
  padding: 1rem;
  margin: 1rem 0;
  width: 80vw;
  height: 130vw;
  border-radius: 20px;
}
</style>
