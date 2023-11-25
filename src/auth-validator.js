import router from "./router";
import axios from "axios"; // Assuming you have a configured axios instance
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
      alert("Your connection has changed!");
      Cookies.remove("token");
      setTimeout(() => {
        router.push("/login");
      }, 0);
      this.$store.dispatch("logout");
    } else {
      console.log(response);
      //   this.$store.dispatch("login");
    }
  } catch (error) {
    alert("Your connection has changed!");
    Cookies.remove("token");
    setTimeout(() => {
      router.push("/login");
    }, 0);
    // this.$store.dispatch("logout");
    if (axios.isAxiosError(error)) {
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
  Cookies.remove("token");
  setTimeout(() => {
    router.push("/login");
  }, 0);
}
