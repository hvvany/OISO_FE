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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
