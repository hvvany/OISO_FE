<template>
  <div>
    <h1>Login View</h1>
    <input type="text" placeholder="아이디 입력"/>
    <input type="text" placeholder="비밀번호 입력"/>
    <button type="button">로그인</button>
    <router-link :to="'/user/signup'">회원가입</router-link>
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

<style scoped></style>
