<template>
  <div>
    <nav>
      <ul class="nav-group">
        <li class="nav-group__btn">
          <a @click="$router.push('/trip')" class="material-symbols-outlined">
            home
          </a>
          <div>Home</div>
        </li>
        <li class="nav-group__btn">
          <a
            @click="$router.push('/article/board')"
            class="material-symbols-outlined">
            note_alt
          </a>
          <div>게시판</div>
        </li>
        <li class="nav-group__btn">
          <a
            @click="$router.push('/article/hotplace')"
            class="material-symbols-outlined">
            dashboard
          </a>
          <div>핫플</div>
        </li>
        <li class="nav-group__btn">
          <a @click="$router.push(`/mytrip/${userId}`)" class="material-symbols-outlined"> luggage </a>
          <div>My Trip</div>
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
  height: 3.7rem;
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
  display: flex;
  flex-direction: column;
  font-size: 0.5rem;
}
</style>
