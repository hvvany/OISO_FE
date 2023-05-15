<template>
  <div>
    <div class="top-back">
      <div class="top-back__arrow material-symbols-outlined">arrow_back</div>
      <div>{{ title }}</div>
    </div>
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
  display: flex;
  align-items: center;
  padding: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
  border-bottom: solid 1px gray;
}
.top-back__arrow {
  font-size: 2rem;
  padding: 0 1rem;
}
</style>
