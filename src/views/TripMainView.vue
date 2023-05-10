<template>
  <div>
    <img-swiper class="main-swiper" :imgs="imgs"></img-swiper>
    <content class="main-content">
      <input class="main-content__search" type="search" placeholder="어데로 가노 마" />
      <img-cards :infos="imgs"></img-cards>
    </content>
    <app-nav></app-nav>
  </div>
</template>

<script>
import AppNav from "@/components/layout/AppNav.vue";
import ImgSwiper from "@/components/common/ImgSwiper.vue";
import ImgCards from "@/components/common/ImgCards.vue";
export default {
  name: "TripMain",
  components: { AppNav, ImgSwiper, ImgCards },
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
.main-swiper{
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
  border-radius: 20px;
  position: relative;
  bottom: 5rem;
  z-index: 10;
}
.main-content__search{
  border-radius: 30px;
  width:70vw;
  height:3rem;
  margin: 1.2rem 1.2rem;
  padding:1.2rem;
}
</style>
