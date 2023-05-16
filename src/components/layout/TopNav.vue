<template>
  <div>
    <nav
      :style="
        'background-color:rgba(255,255,255,' +
        topNavNum +
        '%);color:rgb(' +
        (255 - topNavNum * 2) +
        ',' +
        (255 - topNavNum * 2) +
        ',' +
        (255 - topNavNum * 2) +
        ')'
      ">
      <div class="nav__logo">OISO</div>
      <div class="nav__menus">
        <div class="menus__add-btn">
          <span
            class="material-symbols-outlined"
            @click="$router.push('/trip/info')">
            add
          </span>
        </div>
        <div class="menus__aside-btn">
          <span class="material-symbols-outlined" @click="$parent.openNav()">
            menu
          </span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "TopNav",
  components: {},
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
  props: {
    topNavNum: Number,
  },
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  z-index: 10;
  width: 100vw;
  padding: 0 1rem 0 1rem;
  height: 3rem;
  color: aliceblue;
}
.nav__logo {
  font-weight: 700;
  font-size: 1.2rem;
}
.nav__menus {
  display: flex;
  align-items: center;
}
</style>
