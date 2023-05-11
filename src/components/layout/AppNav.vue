<template>
  <div>
    <nav>
      <ul class="nav-group">
        <li class="nav-group__btn">
          <button @click="$router.push('/trip')">Home</button>
        </li>
        <li class="nav-group__btn">
          <button @click="$router.push('/article/board')">게시판</button>
        </li>
        <li class="nav-group__btn">
          <button @click="$router.push('/article/hotplace')">핫플</button>
        </li>
        <li class="nav-group__btn">
          <button @click="$router.push(`/mytrip/${userId}`)">나의 계획</button>
        </li>
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
  display: flex;
  align-items: center;
  padding: 0;
  width: 100vw;
  height: 3rem;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: rgb(255, 255, 255);
  border-top: 1px solid rgba(0, 0, 0, 0.162);
  z-index: 10;
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
