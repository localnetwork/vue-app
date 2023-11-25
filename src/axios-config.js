import axios from "axios";
import Cookies from "js-cookie";

// Add a request interceptor
axios.interceptors.request.use((config) => {
  // Modify the request config here
  // For example, you can add headers
  const token = Cookies.get("jwtToken"); // Change to 'jwtToken'
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Modify the response data here
    return response;
  },
  (error) => {
    // Handle errors here
    return Promise.reject(error);
  }
);

export default axios;
