<template>
  <div>
    <div>
      <textarea
        placeholder="댓글 입력 ..."
        rows="2"
        v-model="comment"></textarea>
      <button @click="sendComment">등록</button>
    </div>
  </div>
</template>

<script>
import http from "@/util/http-common";
import { mapGetters } from "vuex";
export default {
  props: {
    articleNo: Number,
    type: String,
  },
  data() {
    return {
      comment: "",
    };
  },
  created() {},
  methods: {
    sendComment() {
      console.log(this.type);
      if (this.comment != "") {
        http
          .post(`/comment/${this.type}`, {
            id: this.userInfo.userId,
            comment: this.comment,
            articleNo: this.articleNo,
          })
          .then(({ status }) => {
            if (status == 200) {
              this.$router.go();
            }
          });
      } else {
        alert("정보를 입력해 주세요");
      }
    },
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
};
</script>

<style scoped>
textarea {
  width: 80vw;
  height: 10vw;
  line-height: 1.3rem;
  border: 1px solid black;
  border-radius: 10px;
  padding: 1rem;
  font-size: 10px;
}

button {
  width: 50px;
  margin-left: 8px;
  margin-top: 1vw;
}
</style>
