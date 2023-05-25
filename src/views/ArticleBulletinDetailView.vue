<template>
  <div style="background-color: white">
    <div v-if="!editMode">
      <top-form-nav
        :title="'공지사항'"
        :mode="'디테일'"
        :canEdit="canEdit"></top-form-nav>
      <div class="meta-info">
        <span class="meta__author">{{ content_author }}</span>
        <span class="meta__regTime">{{ content_regTime }}</span>
      </div>
      <div class="meta-info__cnt">
        <span class="meta__cnt">조회수 {{ content_viewCnt }} </span>
        <span class="meta__cnt">like {{ content_likeCnt }}</span>
      </div>
      <div class="title--before-edit">
        {{ content_title }}
      </div>
      <hr />
      <p class="content info__overview">{{ content_text }}</p>
      <div class="like-group">
        <div
          class="like--checked"
          v-if="likeChecked"
          @click="updateLikeCnt()"></div>
        <div class="like--unchecked" v-else @click="updateLikeCnt()"></div>
        <div>좋아요 {{ content_likeCnt }}개</div>
      </div>
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
    <app-nav :navmode="'bulletin'"></app-nav>
  </div>
</template>

<script>
// import editor plugins

import http from "@/util/http-common";
// import TopFormNav from "@/components/layout/TopFormNav.vue";
// import AppNav from "@/components/layout/AppNav.vue";
// import AppFooter from "@/components/layout/AppFooter.vue";
import { mapGetters } from "vuex";
export default {
  name: "BulletinDetail",
  components: {
    TopFormNav: () => import("@/components/layout/TopFormNav"),
    AppNav: () => import("@/components/layout/AppNav"),
    AppFooter: () => import("@/components/layout/AppFooter"),
  },
  data() {
    return {
      articleNo: 0,
      content_title: "",
      content_text: "",
      content_author: "",
      content_regTime: "",
      content_viewCnt: 0,
      content_likeCnt: 0,
      editMode: false,
      canEdit: false,
      comments: "",
      imgs: [],
      likeChecked: false,
    };
  },
  created() {
    this.getArticleDetail();
    this.getLikeCnt();
  },
  mounted() {},
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    getArticleDetail() {
      http
        .get("/article/bulletin/" + this.$route.params.articleNo)
        .then((response) => {
          const boardData = response.data;
          console.log(response.data);
          this.content_title = boardData.title;
          this.content_text = boardData.content;
          this.articleNo = boardData.articleNo;
          this.content_author = boardData.id;
          this.content_regTime = boardData.regTime;
          this.content_viewCnt = boardData.viewCnt;
          this.content_likeCnt = boardData.likeCnt;
          if (this.userInfo.userId === boardData.id) {
            this.canEdit = true;
            console.log(this.canEdit);
          }
        });
    },
    changeEdit() {
      this.editMode = !this.editMode;
    },
    modifyArticle() {
      console.log(this);
      if ((this.content_text != "") & (this.content_title != "")) {
        http
          .put(`/article/bulletin/${this.articleNo}`, {
            articleNo: this.articleNo,
            title: this.content_title,
            content: this.content_text,
            viewCnt: this.content_viewCnt,
          })
          .then(({ status }) => {
            if (status == 200) {
              this.$router.push({ name: "bulletin" });
            }
          });
      } else {
        alert("정보를 입력해 주세요");
      }
    },
    deleteArticle() {
      http
        .delete("/article/bulletin/" + this.$route.params.articleNo)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "bulletin" });
        });
    },
    getLikeCnt() {
      http
        .get(
          `/article/bulletin/${this.$route.params.articleNo}/like/${this.userInfo.userId}`
        )
        .then((response) => {
          console.log(response);
          this.likeChecked = response.data;
        });
    },
    updateLikeCnt() {
      http
        .post(`/article/bulletin/${this.articleNo}/like`, {
          articleNo: this.articleNo,
          id: this.userInfo.userId,
        })
        .then((response) => {
          this.likeChecked = response.data;
          console.log(response);
          this.getArticleDetail();
        });
    },
  },
};
</script>

<style scoped>
.meta-info {
  font-size: 0.8rem;
  margin: 1rem 1rem 2rem 1rem;
  text-align: start;
}
.meta-info__cnt {
  font-size: 0.8rem;
  margin: 0 1rem;
  text-align: start;
}
.meta__author {
  font-size: 1rem;
}
.meta__regTime {
  margin: 0rem 1rem;
}
.title--before-edit {
  font-size: 1.4rem;
  margin: 1rem 1rem;
  text-align: start;
}

.input__title {
  width: 80vw;
  border-radius: 20px;
  border-width: 1px;
  height: 3rem;
  padding: 0 1rem;
  margin: 1rem;
}
.info__overview {
  text-align: start;
  padding: 1rem;
  line-height: 1.4rem;
  margin: 4vw 2vh;
  font-size: 1rem;
}
.main-swiper {
  margin: 1rem;
}

.space__author,
.space__regTime {
  font-size: 0.8rem;
}
.comment {
  font-size: 1.3rem;
  font-weight: 700;
  text-align: start;
  padding: 1rem;
}
.input__text {
  padding: 1rem;
  margin: 1rem 0;
  width: 80vw;
  height: 100vw;
  border-radius: 20px;
}
.like-group {
  display: flex;
  align-items: center;
}
.like--checked {
  background-image: url(../../public/img/heart_red.png);
  background-size: cover;
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  margin: 1rem 1rem 1rem 2rem;
}
.like--unchecked {
  background-image: url(../../public/img/heart.png);
  background-size: cover;
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  margin: 1rem 1rem 1rem 2rem;
}
.like-group {
  display: flex;
  align-items: center;
  font-weight: 700;
}
.like--checked {
  background-image: url(../../public/img/heart_red.png);
  background-size: cover;
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  margin: 0 0.5rem 0 2rem;
}
.like--unchecked {
  background-image: url(../../public/img/heart.png);
  background-size: cover;
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  margin: 0 0.5rem 0 2rem;
}
</style>
