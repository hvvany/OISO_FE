<template>
  <div>
    <top-nav></top-nav>
    <img-swiper class="main-swiper" :imgs="imgs"></img-swiper>
    <content class="main-content">
      <div class="main-content__search">
        <span class="search__icon material-symbols-outlined"> search </span>
        <input
          class="search__input"
          type="search"
          placeholder="어데로 갈라고" />
      </div>
      <div class="main-content__hotplace">
        <div class="hotplace">
          <h2 class="hotplace__title">OISO 핫플레이스</h2>
          <router-link class="hotplace__more-btn" to="">더보기</router-link>
        </div>
        
        <img-cards class="hotplace__cards" :infos="imgs"></img-cards>
      </div>
    </content>
    <app-nav></app-nav>
  </div>
</template>

<script>
import AppNav from "@/components/layout/AppNav.vue";
import ImgSwiper from "@/components/common/ImgSwiper.vue";
import ImgCards from "@/components/common/ImgCards.vue";
import TopNav from "@/components/layout/TopNav.vue";
export default {
  name: "TripMain",
  components: { AppNav, ImgSwiper, ImgCards, TopNav },
  data: function () {
    return {
      message: "",
      imgs: [
        "https://velog.velcdn.com/images/hvvany/post/a64ad69a-eccb-4a55-94f3-2b05ea7c55f7/image.jpeg",
        "https://velog.velcdn.com/images/hvvany/post/1b780879-5266-4854-af6f-1dcd427f526c/image.jpeg",
        "https://velog.velcdn.com/images/hvvany/post/06500863-ae48-48f4-a731-a3e2a7507b73/image.jpeg",
      ],
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.main-swiper {
  position: sticky;
  top: 0;
}
.main-content {
  padding: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  border-radius: 30px;
  position: relative;
  bottom: 5rem;
  z-index: 2;
}
.main-content__search {
  border-style: solid;
  border-width: 0.1rem;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70vw;
  height: 2.5rem;
  margin: 1.2rem 1.2rem;
  padding: 0 1rem 0 1rem;
}
.search__icon {
  color: #0000008f;
}
.search__input {
  font-size: 0.5rem;
  border: none;
  width: 100%;
}

.hotplace{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin:0 1rem 0 1rem;
}
.hotplace__title{
  font-size: 1.1rem;
  font-weight: 500;
}
.hotplace__more-btn {
  text-decoration: none;
  color: #3c59ee;
  font-weight: 700;
  font-size: 0.7rem;
}
</style>
