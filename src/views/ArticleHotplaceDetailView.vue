<template>
  <div style="background-color: white">
    <div v-if="!editMode">
      <top-form-nav
        :title="'핫플레이스'"
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
      <button @click="updateLikeCnt()">좋아요!</button>
      <div class="title--before-edit">
        {{ content_title }}
      </div>
      <hr />

      <img-swiper class="main-swiper" :imgs="imgs"></img-swiper>
      <p class="content info__overview">{{ content_text }}</p>
      <hr />
      <h3 class="comment">댓글</h3>
      <comment-row
        type="hotplace"
        v-for="comment in comments"
        :key="comment.commentNo"
        :articleNo="comment.articleNo"
        :comment="comment"></comment-row>
      <comment-write
        :articleNo="this.articleNo"
        type="hotplace"></comment-write>
    </div>
    <div v-else>
      <top-form-nav
        :title="content_title"
        :mode="'디테일수정'"
        :canEdit="canEdit"></top-form-nav>
      <input class="input__title" type="text" v-model="content_title" />
      <textarea class="input__text" v-model="content_text"></textarea>
      <hr />
      <h3 class="comment">댓글</h3>
      <comment-row
        type="hotplace"
        v-for="comment in comments"
        :key="comment.commentNo"
        :articleNo="comment.articleNo"
        :comment="comment"></comment-row>
      <comment-write
        :articleNo="this.articleNo"
        type="hotplace"></comment-write>
    </div>

    <app-footer></app-footer>
    <app-nav :navmode="'hotplace'"></app-nav>
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
  name: "HotplaceDetail",
  components: {
    TopFormNav: () => import("@/components/layout/TopFormNav"),
    AppNav: () => import("@/components/layout/AppNav"),
    AppFooter: () => import("@/components/layout/AppFooter"),
    ImgSwiper: () => import("@/components/common/ImgSwiper"),
    "comment-write": () => import("@/components/comment/CommentWrite"),
    "comment-row": () => import("@/components/comment/CommentRow"),
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
    };
  },
  created() {
    http.get("/article/hotplace/").then((response) => {
      for (let article of response.data) {
        if (article.articleNo == this.$route.params.articleNo) {
          for (let imgs of article.fileInfos) {
            this.imgs.push(imgs.onlinePath);
          }
          console.log(this.imgs);
          break;
        }
      }
    });
    http
      .get("/article/hotplace/" + this.$route.params.articleNo)
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
    this.getComment();
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
    modifyArticle() {
      console.log(this);
      if ((this.content_text != "") & (this.content_title != "")) {
        http
          .put(`/article/hotplace/${this.articleNo}`, {
            articleNo: this.articleNo,
            title: this.content_title,
            content: this.content_text,
            viewCnt: this.content_viewCnt,
            likeCnt: this.content_likeCnt,
          })
          .then(({ status }) => {
            if (status == 200) {
              this.$router.push({ name: "hotplace" });
            }
          });
      } else {
        alert("정보를 입력해 주세요");
      }
    },
    deleteArticle() {
      http
        .delete("/article/hotplace/" + this.$route.params.articleNo)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "board" });
        });
    },
    getComment() {
      http
        .get("/comment/hotplace/" + this.$route.params.articleNo)
        .then((response) => {
          this.comments = response.data;
        });
    },
    updateLikeCnt() {
      http
        .put(`/article/hotplace/${this.articleNo}`, {
          articleNo: this.articleNo,
          title: this.content_title,
          content: this.content_text,
          likeCnt: this.content_likeCnt++,
          viewCnt: this.content_viewCnt,
        })
        .then(({ status }) => {
          if (status == 200) {
            // this.$router.push("/article/board/" + board.articleNo);
          }
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
</style>
