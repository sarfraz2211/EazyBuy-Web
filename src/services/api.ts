import axios from "axios";

const api = axios.create({

  baseURL:
    "https://e-commerce-vpz9.onrender.com/api",

  timeout: 10000,
});

api.interceptors.request.use(

  config => {

    if (
      typeof window !==
      "undefined"
    ) {

      const token =
        localStorage.getItem(
          "token"
        );

      if (token) {

        config.headers.Authorization =
          `Bearer ${token}`;
      }
    }

    return config;
  },

  error =>
    Promise.reject(error)
);

export default api;