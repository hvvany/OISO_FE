<template>
  <div>
    <nav>
      <ul class="nav-group">
        <li class="nav-group__btn">
          <a
            v-if="navmode === 'home'"
            @click="$router.push('/trip')"
            class="material-symbols-outlined"
            style="color: red">
            home
          </a>
          <a
            v-else
            @click="$router.push('/trip')"
            class="material-symbols-outlined">
            home
          </a>
          <div>Home</div>
        </li>
        <li class="nav-group__btn">
          <a
            v-if="navmode === 'board'"
            @click="$router.push('/article/board')"
            class="material-symbols-outlined"
            style="color: red">
            note_alt
          </a>
          <a
            v-else
            @click="$router.push('/article/board')"
            class="material-symbols-outlined">
            note_alt
          </a>
          <div>게시판</div>
        </li>
        <li class="nav-group__btn">
          <a
            v-if="navmode === 'hotplace'"
            @click="$router.push('/article/hotplace')"
            class="material-symbols-outlined"
            style="color: red">
            dashboard
          </a>
          <a
            v-else
            @click="$router.push('/article/hotplace')"
            class="material-symbols-outlined">
            dashboard
          </a>
          <div>핫플</div>
        </li>
        <li class="nav-group__btn">
          <!-- /mytrip/${userId} 해야하는데 일단 에러나므로 이렇게 처리 -->
          <a
            v-if="navmode === 'mytrip'"
            @click="$router.push(`/mytrip/`)"
            class="material-symbols-outlined"
            style="color: red">
            luggage
          </a>
          <a
            v-else
            @click="$router.push(`/mytrip/`)"
            class="material-symbols-outlined">
            luggage
          </a>
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
  props: {
    navmode: String,
  },
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
  z-index: 5;
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
