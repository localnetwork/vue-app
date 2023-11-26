import router from "./router";
import axios from "axios"; // Assuming you have a configured axios instance
import Cookies from "js-cookie";
import store from "./interceptors/store";

const token = Cookies.get("token");
if (token) {
  try {
    const response = axios.get(
      `${import.meta.env.VITE_APP_URL}/validators/validateToken.php`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status !== 200) {
      store.state.isAuthenticated = false;
      alert("Your connection has changed!");
      Cookies.remove("token");
      setTimeout(() => {
        router.push("/login");
      }, 0);
    } else {
      console.log(response);
      store.state.isAuthenticated = true;
      if (store.state.isUserRoles == null) {
        try {
          const rolesFD = new FormData();
          rolesFD.append("method", "getUserRoles");
          rolesFD.append("userId", 22);
          const resRoles = axios.post(
            `${import.meta.env.VITE_APP_URL}/handler/router.php`,
            rolesFD,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          store.state.isUserRoles = resRoles.data.data;
        } catch (error) {
          store.state.isUserRoles = null;
        }
      } else {
        console.log("heheh");
      }
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      store.state.isAuthenticated = false;
      alert("Your connection has changed!");
      Cookies.remove("token");
      setTimeout(() => {
        router.push("/login");
      }, 0);
      console.error("Axios error:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    } else {
      console.error("General error:", error.message);
    }
  }
} else {
  store.state.isAuthenticated = false;
  Cookies.remove("token");
  setTimeout(() => {
    router.push("/login");
  }, 0);
}
