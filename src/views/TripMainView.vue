<template>
  <div>
    <!-- 상단 네브바 -->
    <top-nav :topNavNum="topNavNum"></top-nav>

    <!-- 사이드바 -->
    <div id="mySidebar" class="sidebar">
      <a href="javascript:void(0)" class="closebtn" @click="closeNav()"
        >&times;</a
      >
      <a href="#">사용자 이름</a>
      <a href="#">개인정보 수정</a>
      <a href="#">로그아웃</a>
      <router-link v-if="local" :to="{ name: 'member' }">member</router-link>
      <router-link :to="{ name: 'bulletin' }">공지사항</router-link>
    </div>

    <!-- 상단 이미지 스와이퍼 -->
    <img-swiper class="main-swiper" :imgs="imgs"></img-swiper>

    <!-- 메인 화면 콘텐트 -->
    <content class="main-content">
      <div class="main-content__search">
        <button
          type="button"
          class="search__input"
          @click="$router.push('/trip/info')">
          <span class="search__icon material-symbols-outlined"> search </span>
          <p>어디로 여행을 가시나요</p>
        </button>
      </div>
      <div class="main-content__hotplace">
        <div class="hotplace">
          <h2 class="hotplace__title">OISO 핫플레이스</h2>
          <router-link class="hotplace__more-btn" :to="{ name: 'hotplace' }"
            >더보기</router-link
          >
        </div>

        <img-cards class="hotplace__cards" :infos="imgs"></img-cards>
      </div>
    </content>
    <app-footer></app-footer>

    <!-- 하단 네브바 -->
    <app-nav :navmode="'home'"></app-nav>
  </div>
</template>

<script>
import AppNav from "@/components/layout/AppNav.vue";
import ImgSwiper from "@/components/common/ImgSwiper.vue";
import ImgCards from "@/components/common/ImgCards.vue";
import TopNav from "@/components/layout/TopNav.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
export default {
  name: "TripMain",
  components: { AppNav, ImgSwiper, ImgCards, TopNav, AppFooter },
  data: function () {
    return {
      message: "",
      imgs: [
        "https://velog.velcdn.com/images/hvvany/post/a64ad69a-eccb-4a55-94f3-2b05ea7c55f7/image.jpeg",
        "https://velog.velcdn.com/images/hvvany/post/1b780879-5266-4854-af6f-1dcd427f526c/image.jpeg",
        "https://velog.velcdn.com/images/hvvany/post/06500863-ae48-48f4-a731-a3e2a7507b73/image.jpeg",
      ],
      topNavNum: 0,
    };
  },
  created() {},
  methods: {
    onScroll() {
      //스크롤시 이벤트가 실행된다.
      let value = window.scrollY;
      if (value <= 200) {
        this.topNavNum = Math.floor(value / 2);
      } else {
        this.topNavNum = 100;
      }
    },
    openNav() {
      document.getElementById("mySidebar").style.width = "17rem";
    },

    closeNav() {
      document.getElementById("mySidebar").style.width = "0";
    },
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
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
  display: flex;
  align-items: center;
  background-color: #ffffffff;
  font-size: 0.5rem;
  border: none;
  width: 100%;
}

.hotplace {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 1rem 0 1rem;
}
.hotplace__title {
  font-size: 1.1rem;
  font-weight: 500;
}
.hotplace__more-btn {
  text-decoration: none;
  color: #3c59ee;
  font-weight: 700;
  font-size: 0.7rem;
}
/* The sidebar menu */
.sidebar {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 10; /* Stay on top */
  top: 0;
  right: 0;
  background-color: #ffffff; /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidebar */
}

/* The sidebar links */
.sidebar a {
  padding: 8px 8px 8px 8px;
  text-decoration: none;
  font-size: 25px;
  color: #aeaeae;
  display: block;
  transition: 0.3s;
}

/* When you mouse over the navigation links, change their color */
.sidebar a:hover {
  color: #000000;
}

/* Position and style the close button (top right corner) */
.sidebar .closebtn {
  position: absolute;
  top: 0;
  left: 1rem;
  font-size: 36px;
  margin-right: 5rem;
}

/* The button used to open the sidebar */
/* .openbtn {
  font-size: 20px;
  cursor: pointer;
  background-color: #111;
  color: white;
  padding: 10px 15px;
  border: none;
}

.openbtn:hover {
  background-color: #444;
} */

/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
/* #main {
  transition: margin-left 0.5s; /* If you want a transition effect
  padding: 20px;
} */

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidebar {
    padding-top: 15px;
  }
  .sidebar a {
    font-size: 18px;
  }
}
</style>
