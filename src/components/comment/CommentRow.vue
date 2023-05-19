<template>
  <div>
    <div v-if="!showModal">
      <div class="comment__author">{{ author }}</div>
      <div class="comment__text">{{ comment_text }}</div>
      <div class="group__button">
        <button @click="modifyStart">수정</button>
        <button @click="deleteComment">삭제</button>
      </div>
    </div>
    <div v-else>
      <div class="comment__author">{{ author }}</div>
      <textarea class="comment__text" v-model="comment_text"></textarea>
      <div class="group__button">
        <button @click="modifyEnd">완료</button>
        <button @click="modifyStop">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/util/http-common";
export default {
  props: {
    comment: Object,
    type: String,
  },
  data() {
    return {
      showModal: false,
      commentNo: "",
      author: "",
      comment_text: "",
      articleNo: "",
    };
  },
  created() {
    this.commentNo = this.comment.commentNo;
    this.comment_text = this.comment.comment;
    this.author = this.comment.id;
  },
  methods: {
    modifyStart() {
      this.showModal = true;
    },
    modifyStop() {
      this.showModal = false;
    },
    modifyEnd() {
      if (this.comment_text != "") {
        http
          .put(`/comment/${this.type}/${this.commentNo}`, {
            commentNo: this.commentNo,
            comment: this.comment_text,
          })
          .then(({ status }) => {
            if (status == 200) {
              //값 초기화
              this.userName = "";
              this.comment_text = "";
              this.modifyStop();
              this.$router.go();
            }
          })
          .catch(({ response }) => {
            console.log(response);
          });
      } else {
        alert("정보를 입력해 주세요");
      }
    },
    deleteComment() {
      if (confirm("이걸 뭘로 바꾸지")) {
        this.delete();
        this.$router.go();
      }
    },
    delete() {
      http
        .delete(`/comment/board/${this.commentNo}`)
        .then((response) => {
          console.log("댓글 삭제 완료");
          console.log(response.data);
        })
        .catch((response) => {
          console.log("error.");
          console.log(response.data);
        });
    },
  },
};
</script>
<style>
.comment__author {
  text-align: left;
  margin-left: 10vw;
  margin-bottom: 2vw;
}

.comment__text {
  width: 90vw;
  height: 20vw;
  background-color: white;
  padding: 2vw;
  border: 1px solid black;
  border-radius: 10px;
  display: inline-block;
  text-align: left;
  font-size: 10px;
}

.group__button {
  margin-top: 1vw;
}

button {
  width: 50px;
  border: 1px solid #989898;
  background-color: white;
  border-radius: 8px;
  padding: 10px 12px;
  margin: 0px 10px;
  font-size: 10px;
}
</style>
