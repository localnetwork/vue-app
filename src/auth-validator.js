import router from "./router";
import axios from "axios";
import Cookies from "js-cookie";
import store from "./interceptors/store";

const token = Cookies.get("token");
if (token) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/validators/validateToken.php`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status !== 200) {
      store.state.isAuthenticated = false;
      store.state.isUserId = null;
      store.state.isUserInfo = null;
      alert("Your connection has changed!");
      Cookies.remove("token");
      setTimeout(() => {
        router.push("/login");
      }, 0);
    } else {
      store.state.isAuthenticated = true;
      store.state.isUserId = response.data.user_info.id;
      store.state.isUserInfo = response.data.user_info;
      try {
      } catch (error) {
        console.error("Errors:", error);
      }
      try {
        const rolesFD = new FormData();
        rolesFD.append("method", "getUserRole");
        rolesFD.append("userId", response.data.user_id);
        const resRoles = await axios.post(
          `${import.meta.env.VITE_APP_URL}/handler/router.php`,
          rolesFD,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // if (resRoles.data.data.user_status === 2) {
        //   store.state.isUserRoles = resRoles.data.data.role;
        // } else {
        //   store.state.isUserRoles = null;
        //   store.state.isAuthenticated = false;
        //   alert("Your connection has changed!");
        //   Cookies.remove("token");
        //   setTimeout(() => {
        //     router.push("/login");
        //   }, 0);
        // }
      } catch (error) {
        store.state.isUserRoles = null;
        store.state.isAuthenticated = false;
        alert("Your connection has changed!");
        Cookies.remove("token");
        setTimeout(() => {
          router.push("/login");
        }, 0);
      }

      // console.log("catch roles", store.state.isUserRoles);
      // store.state.isUserRoles = resRoles.data.data;
      // if (store.state.isUserRoles == null) {
      //   try {
      //     const rolesFD = new FormData();
      //     rolesFD.append("method", "getUserRole");
      //     rolesFD.append("userId", 1);
      //     const resRoles = await axios.post(
      //       `${import.meta.env.VITE_APP_URL}/handler/router.php`,
      //       rolesFD,
      //       {
      //         headers: {
      //           "Content-Type": "multipart/form-data",
      //         },
      //       }
      //     );
      //     store.state.isUserRoles = resRoles.data.data;
      //   } catch (error) {
      //     store.state.isUserRoles = null;
      //   }
      // } else {
      //   // console.log("heheh");
      // }
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      store.state.isAuthenticated = false;
      alert("Your connection has changed!");
      Cookies.remove("token");
      setTimeout(() => {
        router.push("/login");
      }, 0);
      // console.error("Axios error:", error.message);
      if (error.response) {
        // console.error("Response data:", error.response.data);
        // console.error("Response status:", error.response.status);
        // console.error("Response headers:", error.response.headers);
      }
    } else {
      // console.error("General error:", error.message);
    }
  }
} else {
  store.state.isAuthenticated = false;
  Cookies.remove("token");
  setTimeout(() => {
    router.push("/login");
  }, 0);
}
