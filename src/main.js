import { createApp } from "vue";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from "./App.vue";
import router from "./router";
import axios from "axios"; // Assuming you have a configured axios instance
import Cookies from "js-cookie";
import store from "./interceptors/store";
import "./auth-validator";

import "./assets/main.css";
import "./index.css";

const app = createApp(App);

// const token = Cookies.get("token");

// Example of sending the token with Axios
// const token = Cookies.get("token");

// if (token) {
//   try {
//     const response = await axios.get(
//       `${import.meta.env.VITE_APP_URL}/validators/validateToken.php`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     if (response.status !== 200) {
//       Cookies.remove("token");
//       setTimeout(() => {
//         router.push("/login");
//       }, 0);
//     }
//   } catch (error) {
//     Cookies.remove("token");
//     setTimeout(() => {
//       router.push("/login");
//     }, 0);
//     if (axios.isAxiosError(error)) {
//       console.error("Axios error:", error.message);
//       if (error.response) {
//         console.error("Response data:", error.response.data);
//         console.error("Response status:", error.response.status);
//         console.error("Response headers:", error.response.headers);
//       }
//     } else {
//       console.error("General error:", error.message);
//     }
//   }
// } else {
//   Cookies.remove("token");
//   setTimeout(() => {
//     router.push("/login");
//   }, 0);
// }
// if (!token) {
//   setTimeout(() => {
//     router.push("/login");
//   }, 0);
// }
// Navigation guard
// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     const token = Cookies.get("token");

//     if (!token) {
//       // Redirect to login if not authenticated
//       next("/login");
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });
app.use(store);
app.use(Toast);
app.use(router);
app.mount("#app");
