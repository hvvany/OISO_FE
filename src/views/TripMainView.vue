<template>
  <div>
    <!-- 상단 네브바 -->
    <top-nav :topNavNum="topNavNum"></top-nav>

    <!-- 사이드바 -->
    <div id="mySidebar" class="sidebar">
      <a href="javascript:void(0)" class="closebtn" @click="closeNav()"
        >&times;</a
      >
      <a href="#">{{ userInfo.userId }}님</a>
      <a href="#">개인정보 수정</a>
      <a @click="logout()">로그아웃</a>
      <router-link v-if="isAdmin" :to="{ name: 'member' }">member</router-link>
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
          <p>어디로 여행을 가시나요?</p>
        </button>
      </div>
      <div class="main-content__hotplace">
        <div class="hotplace">
          <h2 class="hotplace__title">핫플레이스 TOP 3</h2>
          <router-link class="hotplace__more-btn" :to="{ name: 'hotplace' }"
            >더보기</router-link
          >
        </div>

        <div class="cards" v-for="(hotplace, idx) in hotplaceData" :key="idx">
          <div
            class="card"
            v-if="idx < 3"
            @click="$router.push('/article/hotplace/' + hotplace.articleNo)">
            <h1 class="card__number">BEST {{ idx + 1 }}</h1>
            <img class="card__img" :src="hotplace.fileInfos[0].onlinePath" />
            <h3 class="card__title">{{ hotplace.title }}</h3>
            <p class="card__content">{{ hotplace.content | showFirstLine }}</p>
            <p class="card__author">@{{ hotplace.id }}</p>
          </div>
        </div>
        <hr />
        <div>
          <h2 class="beta-title">Beta 기능</h2>
          <div class="beta__gpt">
            <div class="gpt__title">무엇이든 물어보시오!</div>
            <div class="gpt__example">
              예시) 부산 서면에 혼자 여행하기 좋은 여행지 추천해줘
            </div>
            <div class="gpt__question-group">
              <textarea class="gpt__question" v-model="gptQuestion"></textarea>
              <button
                v-if="!onGptProcessing"
                class="gpt__btn--no-processing"
                @click="questionGPT()"></button>
              <div v-else class="gpt__btn--processing"></div>
            </div>
            <textarea
              v-if="gptAnswer != ''"
              v-model="gptAnswer"
              class="gpt__answer"></textarea>
          </div>
        </div>
      </div>
    </content>
    <app-footer></app-footer>

    <!-- 하단 네브바 -->
    <app-nav :navmode="'home'"></app-nav>
  </div>
</template>

<script>
import http from "@/util/http-common";
import AppNav from "@/components/layout/AppNav.vue";
import ImgSwiper from "@/components/common/ImgSwiper.vue";
import TopNav from "@/components/layout/TopNav.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "TripMain",
  components: { AppNav, ImgSwiper, TopNav, AppFooter },
  data: function () {
    return {
      message: "",
      imgs: [
        "https://velog.velcdn.com/images/hvvany/post/a64ad69a-eccb-4a55-94f3-2b05ea7c55f7/image.jpeg",
        "https://velog.velcdn.com/images/hvvany/post/1b780879-5266-4854-af6f-1dcd427f526c/image.jpeg",
        "https://velog.velcdn.com/images/hvvany/post/06500863-ae48-48f4-a731-a3e2a7507b73/image.jpeg",
      ],
      topNavNum: 0,
      isAdmin: false,
      hotplaceData: [],
      gptQuestion: "",
      gptAnswer: "",
      onGptProcessing: false,
    };
  },
  created() {
    if (this.userInfo.userId === "ssafy") {
      this.isAdmin = true;
    }
    http.get("/article/hotplace/").then((response) => {
      this.hotplaceData = response.data;
      console.log(response.data);
    });
  },
  methods: {
    ...mapActions(["userLogout"]),
    logout() {
      this.userLogout({});
      this.$router.push({ name: "login" });
    },
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
    questionGPT() {
      this.onGptProcessing = true;
      const apiKey = "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"; // Replace with your OpenAI API key
      const apiUrl = "https://api.openai.com/v1/chat/completions"; //

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      };

      const data = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: this.gptQuestion }],
      };
      http
        .post(apiUrl, data, { headers })
        .then((response) => {
          console.log(response.data); // Process the API response as desired
          this.gptAnswer = response.data.choices[0].message.content;
          this.onGptProcessing = false;
        })
        .catch((error) => {
          this.onGptProcessing = false;
          console.error("Error:", error);
        });
    },
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
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
  width: 75vw;
  height: 2.5rem;
  margin: 1.5rem 1rem 2rem 1rem;
  padding: 0 0.3rem 0 0.3rem;
}
.main-content__hotplace {
  width: 100vw;
}
.search__icon {
  color: #0000008f;
}
.search__input {
  display: flex;
  align-items: center;
  background-color: #ffffffff;
  font-size: 0.8rem;
  border: none;
  width: 100%;
}

.hotplace {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 3rem 0 3rem;
}
.hotplace__title {
  font-size: 1.2rem;
  font-weight: 700;
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
  width: 17rem;
}

/* When you mouse over the navigation links, change their color */
.sidebar a:hover {
  color: #000000;
}

/* Position and style the close button (top right corner) */
.sidebar .closebtn {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 36px;
  width: 1rem;
  padding-left: 2rem;
}
.card__number {
  text-align: start;
  font-weight: 700;
  font-size: 1.2rem;
  margin: 0.5rem 0;
}
.card__img {
  width: 100%;
  height: 13rem;
  border-radius: 5px;
}
.card__title {
  font-size: 1rem;
  font-weight: 700;
  margin: 0.7rem 0;
  text-align: start;
}
.card__content {
  font-size: 0.8rem;
  text-align: start;
  color: #676767;
}
.card__author {
  font-size: 0.6rem;
  margin: 0.7rem 0 2rem 0;
  text-align: start;
  color: #aeaeae;
}
.card {
  margin: 3rem;
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

.beta-title {
  text-align: start;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 2rem 3rem 0rem 3rem;
}

.beta__gpt {
  margin: 2rem 3rem;
}

.gpt {
  margin: 2rem;
}
.gpt__title {
  text-align: start;
  margin: 1rem 0;
  font-weight: 600;
}
.gpt__example {
  text-align: start;
  font-size: 0.3rem;
  color: #7c7c7c;
  font-weight: 400;
  margin: 0.5rem 0.2rem;
}
.gpt__question-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.gpt__question {
  width: 75vw;
  height: 5rem;
  border-radius: 5px;
  border-width: 0.5px;
  border-color: #aeaeae;
}
.gpt__btn--no-processing {
  width: 3rem;
  height: 3rem;
  padding: 0;
  margin: 1rem;
  border-width: 5px;
  border-color: #3c59ee;
  border-radius: 50%;
  background-image: url("../../public/img/confusion.gif");
  background-size: cover;
}
.gpt__btn--processing {
  width: 7rem;
  height: 7rem;
  padding: 0;
  margin: 1rem;
  border-width: 5px;
  border-color: #3c59ee;
  border-radius: 50%;
  background-image: url("../../public/img/overthinking.gif");
  background-size: cover;
}
.gpt__answer {
  width: 75vw;
  height: 20rem;
  padding: 0.7rem;
  margin-bottom: 5rem;
  border-radius: 5px;
  border-width: 0.5px;
  border-color: #aeaeae;
}
</style>
