<template>
  <div>
    <div class="comment">
      <textarea
        placeholder="댓글 입력 ..."
        rows="2"
        v-model="comment"></textarea>
      <button @click="sendComment">
        <span class="material-symbols-outlined"> arrow_upward </span>
      </button>
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
              this.comment = "";
              this.$parent.getComment();
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
.comment {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
}
textarea {
  position: relative;
  left: 1.5rem;
  height: 2rem;
  width: 100vw;
  line-height: 1.3rem;
  border: 0.1px solid rgba(195, 195, 195, 0.638);
  border-radius: 20px;
  padding: 1rem 3.5rem 1rem 1rem;
  font-size: 1rem;
}

button {
  position: relative;
  right: 1.5rem;
  width: 2rem;
  height: 2rem;
  border-width: 0;
  border-radius: 50%;
  background-color: #3485ff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
