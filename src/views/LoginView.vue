<template>
  <div>
    <h1>Login View</h1>
    <div class="login">
      <input class="login__input" type="text" placeholder="아이디 입력" />
      <input class="login__input" type="text" placeholder="비밀번호 입력" />
      <button class="login__btn" type="button">로그인</button>
      <router-link :to="'/user/signup'">회원가입</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  components: {},
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
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
  width: 10rem;
  height: 3rem;
  border-width: 1px;
  border-radius: 20px;
  margin: 0.6rem 0.6rem;
}
</style>
