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
  padding: 0;
  width: 100vw;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: rgb(25, 240, 168);
}
.nav-group {
  padding: 0;
  text-decoration: none;
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 2rem;
}

.nav-group__btn {
}
</style>
