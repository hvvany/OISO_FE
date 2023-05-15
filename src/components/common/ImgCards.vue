<template>
  <div>
    <div class="cards">
      <div class="card" v-for="(info, idx) in infos" :key="idx">
        <img class="card__img" :src="info" />
        <p class="card__title">대충 이름 적음</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImgCards",
  components: {},
  props: {
    infos: Array,
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
.card__img {
  width: 70vw;
  height: 70vw;
}
.card {
  margin: 1rem 1rem;
}
</style>
