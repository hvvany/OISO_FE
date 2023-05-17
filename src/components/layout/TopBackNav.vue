<template>
  <div class="top-back">
    <a @click="$router.go(-1)" class="top-back__arrow material-symbols-outlined"
      >arrow_back</a
    >
    <div class="top-back__title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: "TopBackNav",
  components: {},
  props: {
    title: String,
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
.top-back {
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: rgb(255, 255, 255);
  width: 100vw;
  height: 3.7rem;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-bottom: solid 1px gray;
}
.top-back__arrow {
  font-size: 1.6rem;
  padding: 0 1rem;
}
.top-back__title{
  
}
</style>
