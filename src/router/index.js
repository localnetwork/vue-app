import { createRouter, createWebHistory } from "vue-router";
import { seoGuardWithNext } from "@aminoeditor/vue-router-seo";
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
        rolesAllowed: [1],
        seo: {
          title: "Users Management",
        },
      },
      component: () => import("../views/UsersManagement.vue"),
    },
    {
      path: "/manage/students",
      name: "manage-students",
      meta: {
        // requiresAuth: true,
        rolesAllowed: [1, 2],
        seo: {
          title: "Students",
        },
      },
      component: () => import("../views/Students.vue"),
    },
    {
      path: "/user/create",
      name: "user-create",

      meta: {
        // requiresAuth: true,
        rolesAllowed: [1],
        seo: {
          title: "Create an account",
        },
      },
      component: () => import("../views/users/Create.vue"),
    },
    {
      path: "/user/:userId",
      name: "user-profile",
      meta: {
        // requiresAuth: true,
        seo: {
          title: "Profile",
        },
      },
      component: () => import("../views/users/UserProfile.vue"),
    },
    {
      path: "/user/:userId/edit",
      name: "user-edit",
      meta: {
        // requiresAuth: true,
        rolesAllowed: [1, 2],
        seo: {
          title: "Profile",
        },
      },
      component: () => import("../views/users/UserProfileEdit.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      meta: {
        // requiresAuth: true,
        seo: {
          title: "Profile",
        },
      },
      component: () => import("../views/profile/Profile.vue"),
    },
  ],
});

function dashboardRedirect() {
  router.go("/dashboard");
}

function logOut() {
  store.state.isAuthenticated = false;
  store.state.isUserInfo = null;
  store.state.isUserId = null;
  alert("Your connection has been changed.");
  Cookies.remove("token");
  router.go("/login");
}
const validateToken = async (to, from, next) => {
  next();
  const token = Cookies.get("token");
  const res = await axios.get(
    `${import.meta.env.VITE_APP_URL}/validators/validateToken.php`,
    {
      headers: { authorize: `Bearer ${token}` },
    }
  );
  if (res.data.user_info.user_status && res.data.user_info.user_status == 1) {
    logOut();
  }
  // if (to.meta.rolesAllowed) {
  if (
    to.meta.rolesAllowed &&
    !to.meta.rolesAllowed.includes(res.data.user_info.role)
  ) {
    console.log("not allowed!");
    router.push("/dashboard");
  } else {
    console.log("allowed");
  }
  // }
};

router.beforeEach((to, from, next) => {
  if (to) {
    // console.log(to);
    validateToken(to, from, next);
  }
  if (to.meta.rolesAllowed) {
  }
  if (to.meta.requiresAuth) {
    // console.log("from", from);
    // console.log("next", next);
    // console.log("to", to);
  } else {
    // next();
  }
});
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
