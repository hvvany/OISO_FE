<template>
  <div>
    <h1>로그인</h1>
    <div class="login">
      <input
        class="login__input"
        v-model="userId"
        type="text"
        placeholder="아이디 입력"
        required />
      <p v-show="err === 1">{{ errMsg }}</p>
      <input
        class="login__input"
        v-model="userPw"
        type="text"
        placeholder="비밀번호 입력"
        required />
      <p v-show="err === 2">{{ errMsg }}</p>
      <p v-show="err === 3">{{ errMsg }}</p>
      <button class="login__btn" type="button" @click="validate">로그인</button>
      <router-link :to="'/user/signup'">회원가입</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "LoginView",
  components: {},
  data() {
    return {
      errMsg: "",
      err: 0,
      userId: "",
      userPw: "",
    };
  },
  methods: {
    ...mapActions(["userLogin", "getUserInfo"]),
    validate() {
      this.err = 0;
      let isValid = true; // 유효하면 true
      !this.userId
        ? ((isValid = false),
          (this.err = 1),
          (this.errMsg = "ID를 입력해주세요"),
          this.$refs.id.focus())
        : !this.userPw
        ? ((isValid = false),
          (this.err = 2),
          (this.errMsg = "비밀번호를 입력해주세요"),
          this.$refs.pw1.focus())
        : (isValid = true);

      if (isValid) {
        this.login({
          userId: this.userId,
          userPw: this.userPw,
          callback: (status) => {
            if (status == 200) {
              console.log("로그인 성공");
            } else if (status == 401) {
              alert("로그인에 실패했습니다.");
            }
          },
        });
      }
    },
    login() {
      const thiz = this;
      this.userLogin({
        userId: this.userId,
        userPwd: this.userPw,
        callback: function (status) {
          if (status == 200) {
            thiz.getUserInfo({
              accessToken: thiz.accessToken,
              callback: (status) => {
                console.log("s", status);
                if (status == 200) {
                  thiz.$router.push({ name: "tripmain" });
                }
              },
            });
          } else if (status == 500) {
            alert("서버 오류 입니다.");
          } else {
            thiz.err = 3;
            thiz.errMsg = "로그인에 실패했습니다.";
          }
        },
      });
    },
  },
  computed: {
    ...mapGetters(["accessToken", "userInfo"]),
  },
};
</script>

<style scoped>
h1 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login__input {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  height: 3rem;
  border-width: 1px;
  border-radius: 20px;
  margin: 0.6rem 0.6rem;
  padding: 0 1rem 0 1rem;
}

.login__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 3rem;
  border-width: 1px;
  border-radius: 20px;
  margin: 1rem;
  font-weight: 600;
  background-color: white;
}
</style>
