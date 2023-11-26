import { createRouter, createWebHistory } from "vue-router";
import { seoGuardWithNext } from "@aminoeditor/vue-router-seo";
// import HomeView from "../views/HomeView.vue";
// import DashboardView from "../views/DashboardView.vue";
// import store from "../interceptors/store";
// import NotFound from "../views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      name: "ErrorView",
      meta: {
        seo: {
          title: "Page 404",
        },
      },
      component: () => import("../views/NotFound.vue"),
    },
    {
      path: "/",
      name: "home",
      meta: {
        seo: {
          title: "Login",
        },
      },
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/login",
      name: "login",
      meta: {
        seo: {
          title: "Login",
        },
      },
      component: () => import("../views/HomeView.vue"),
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
    {
      path: "/dashboard",
      name: "dashboard",
      meta: {
        seo: {
          title: "Dashboard",
        },
      },
      // component: DashboardView,
      component: () => import("../views/DashboardView.vue"),
      // meta: { isAuthenticated: true },
    },
    {
      path: "/management/users",
      name: "management-users",
      meta: {
        seo: {
          title: "Users Management",
        },
      },
      component: () => import("../views/UsersManagement.vue"),
    },
    {
      path: "/management/users/:userId",
      name: "user-profile",
      meta: {
        seo: {
          title: "Profile",
        },
      },
      component: () => import("../views/users/UserProfile.vue"),
    },
  ],
});

router.beforeEach(seoGuardWithNext);

export default router;
