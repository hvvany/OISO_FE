import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/user/signup",
    name: "signup",
    component: () => import("@/views/SignUpView.vue"),
  },
  {
    path: "/user/member",
    name: "member",
    component: () => import("@/views/UserMemberView.vue"),
  },
  {
    path: "/trip",
    name: "tripmain",
    component: () => import("@/views/TripMainView.vue"),
  },
  {
    path: "/trip/info",
    name: "tripinfo",
    component: () => import("@/views/TripInfoView.vue"),
  },
  {
    path: "/article/bulletin",
    name: "bulletin",
    component: () => import("@/views/ArticleBulletinView.vue"),
  },
  {
    path: "/article/board",
    name: "board",
    component: () => import("@/views/ArticleBoardView.vue"),
  },
  {
    path: "/article/board/:articleNo",
    name: "boardDetail",
    component: () => import("@/views/ArticleBoardDetailView.vue"),
  },
  {
    path: "/article/board/new",
    name: "boardnew",
    component: () => import("@/views/ArticleBoardNewView.vue"),
  },
  {
    path: "/article/hotplace",
    name: "hotplace",
    component: () => import("@/views/ArticleHotplaceView.vue"),
  },
  {
    path: "/article/hotplace/:articleNo",
    name: "hotplaceDetail",
    component: () => import("@/views/ArticleHotplaceDetailView.vue"),
  },
  // {
  //   path: "/article/hotplace/new",
  //   name: "hotplaceNew",
  //   component: () => import("@/views/ArticleHotplaceNewView.vue"),
  // },
  {
    path: "/mytrip",
    name: "mytrip",
    component: () => import("@/views/MyTripMainView.vue"),
  },
  {
    path: "/mytripmap",
    name: "mytripmap",
    component: () => import("@/views/MytripMap.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

// 지피티야 안녕
