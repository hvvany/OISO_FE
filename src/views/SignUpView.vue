<template>
  <div>
    <h1>SignUp View</h1>
    <div class="signup">
      <input class="signup__input" type="text" placeholder="아이디 입력" />
      <input class="signup__input" type="text" placeholder="비밀번호 입력" />
      <input class="signup__input" type="text" placeholder="비밀번호 확인" />
      <button class="signup__btn" type="button">회원가입</button>
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
  width: 10rem;
  height: 3rem;
  border-width: 1px;
  border-radius: 20px;
  margin: 0.6rem 0.6rem;
}
</style>
