<template>
  <div>
    <h1>회원가입</h1>
    <div class="signup">
      <input
        class="signup__input"
        v-model="userId"
        type="text"
        placeholder="아이디 입력"
        ref="id" />
      <p v-show="err === 1">{{ errMsg }}</p>
      <input
        class="signup__input"
        v-model="userPw1"
        type="text"
        placeholder="비밀번호 입력"
        ref="pw1" />
      <p v-show="err === 2">{{ errMsg }}</p>
      <input
        class="signup__input"
        v-model="userPw2"
        type="text"
        placeholder="비밀번호 확인"
        ref="pw2" />
      <p v-show="err === 3">{{ errMsg }}</p>
      <input
        class="signup__input"
        v-model="email"
        type="text"
        placeholder="이메일 입력"
        ref="email" />
      <p v-show="err === 4">{{ errMsg }}</p>
      <button class="signup__btn" type="button" @click="validate">
        회원가입
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "signUpView",
  components: {},
  data: function () {
    return {
      message: "",
      errMsg: "",
      err: 0,
      userId: "",
      userPw1: "",
      userPw2: "",
      email: "",
    };
  },
  methods: {
    ...mapActions(["userSignUp"]),
    validate() {
      const validateEmail =
        /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/;
      this.err = 0;
      let isValid = true; // 유효하면 true
      !this.userId
        ? ((isValid = false),
          (this.err = 1),
          (this.errMsg = "ID를 입력해주세요"),
          this.$refs.id.focus())
        : !this.userPw1
        ? ((isValid = false),
          (this.err = 2),
          (this.errMsg = "비밀번호를 입력해주세요"),
          this.$refs.pw1.focus())
        : !this.userPw2
        ? ((isValid = false),
          (this.err = 3),
          (this.errMsg = "비밀번호 확인을 입력해주세요"),
          this.$refs.pw2.focus())
        : !(this.userPw1 === this.userPw2)
        ? ((isValid = false),
          (this.err = 3),
          (this.errMsg = "비밀번호를 다시 확인해 주세요"),
          this.$refs.pw2.focus())
        : !this.email
        ? ((isValid = false),
          (this.err = 4),
          (this.errMsg = "이메일을 입력해주세요"),
          this.$refs.email.focus())
        : !validateEmail.test(this.email)
        ? ((isValid = false),
          (this.err = 4),
          (this.errMsg = "이메일을 정확하게 입력해주세요"),
          this.$refs.email.focus())
        : (isValid = true);

      if (isValid) {
        this.signUp();
      }
    },
    signUp() {
      const thiz = this;
      console.log(this.email);
      this.userSignUp({
        userId: this.userId,
        userPwd: this.userPw1,
        emailId: this.email.split("@")[0],
        emailDomain: this.email.split("@")[1],
        callback: function (status) {
          if (status == 200) {
            thiz.$router.push({ name: "login" });
          } else if (status == 500) {
            alert("서버 오류 입니다.");
          }
        },
      });
    },
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

.signup {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.signup__input {
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
.signup__btn {
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
