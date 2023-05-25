<template>
  <div class="top-back">
    <a @click="$router.go(-1)" class="top-back__arrow material-symbols-outlined"
      >arrow_back</a
    >
    <div class="top-back__title">{{ title }}</div>

    <div v-show="type == 'No'">
      <button
        class="button__group"
        @click="$parent.addMyTrip()"
        style="color = black">
        추가
      </button>
    </div>
    <div v-show="type == 'Yes'">
      <button
        class="button__group"
        @click="$parent.delMyTrip()"
        style="color: red">
        삭제
      </button>
      <div>{{ type }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopBackNav",
  components: {},
  props: {
    title: String,
    type: String,
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
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-bottom: solid 1px gray;
  margin-right: 2rem;
}
.top-back__arrow {
  font-size: 1.6rem;
  padding: 0 0.5rem;
}
.top-back__title {
  font-size: 1.1rem;
}

button {
  border-width: 0px;
  padding: 4px;
  margin: 8px;
  color: black;
  background-color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
