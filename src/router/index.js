import { createRouter, createWebHistory } from "vue-router";
import { seoGuardWithNext } from "@aminoeditor/vue-router-seo";
// import HomeView from "../views/HomeView.vue";
// import DashboardView from "../views/DashboardView.vue";
// import store from "../interceptors/store";
// import NotFound from "../views/NotFound.vue";
import store from "../interceptors/store";
import Cookies from "js-cookie";
import axios from "axios";

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
        // requiresAuth: true,
        seo: {
          title: "Dashboard",
        },
      },
      // component: DashboardView,
      component: () => import("../views/DashboardView.vue"),
      // meta: { isAuthenticated: true },
    },
    {
      path: "/manage/users",
      name: "manage-users",
      meta: {
        // requiresAuth: true,
        seo: {
          title: "Users Management",
        },
      },
      component: () => import("../views/UsersManagement.vue"),
    },
    {
      path: "/user/create",
      name: "user-create",
      meta: {
        // requiresAuth: true,
        seo: {
          title: "Create an account",
        },
      },
      component: () => import("../views/users/Create.vue"),
    },
    {
      path: "/user/:userId/edit",
      name: "user-profile",
      meta: {
        // requiresAuth: true,
        seo: {
          title: "Profile",
        },
      },
      component: () => import("../views/users/UserProfile.vue"),
    },
  ],
});

const validateToken = async (token, to, from, next) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_URL}/validators/validateToken.php`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (res.status === 200) {
      console.log("2000");
      next();
    } else {
      console.log("not 2000");
    }
  } catch (error) {
    console.error(error);
  }
};

// router.beforeEach((to, from, next) => {
//   // if (to.meta.requiresAuth) {
//   // } else {
//   // }
// });
// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth) {
//     const token = Cookies.get("token");
//     if (token) {
//       validateToken(token, to, from, next);
//     } else {
//       next("/login");
//     }
//   } else {
//     next();
//   }
// });

router.beforeEach(seoGuardWithNext);

export default router;
