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

import Vuesax from "vuesax3";
import "material-icons/iconfont/material-icons.css";
import "vuesax3/dist/vuesax.css";

const app = createApp(App);

app.use(Vuesax);
app.use(store);
app.use(Toast);
app.use(router);
app.mount("#app");
