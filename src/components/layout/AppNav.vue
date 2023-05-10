<template>
  <div>
    <nav>
      <ul class="nav-group">
        <li class="nav-group__btn">Home</li>
        <li class="nav-group__btn">게시판</li>
        <li class="nav-group__btn">핫플</li>
        <li class="nav-group__btn">나의 계획</li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "AppNav",
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
nav {
  position: fixed;
  bottom: 0;
  background-color: aquamarine;
}
.nav-group {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 2rem;
}

.nav-group__btn {
}
</style>
