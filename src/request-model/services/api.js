import axios from "axios";
import TokenService from "./token.service";

const instance2 = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
});

const instance = axios.create({
  baseURL: "https://uplistbackend-9b27d297fad4.herokuapp.com/api",
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();

    config.headers = {
      ...config.headers,
      "Content-Type": "multipart/form-data",
    };

    if (token) {
      config.headers = { ...config.headers, Authorization: "Bearer " + token };
      // config.headers["Authorization"] = 'Bearer ' + token;
      // config.headers["Content-Type"] = 'multipart/form-data';
      // for Spring Boot back-end
      // config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    console.log("error: ", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    let originalConfig = err.config;

    if (
      originalConfig.url !== "/users/login/" &&
      originalConfig.url !== "/users/login/refresh/" &&
      err.response
    ) {
      //access token was expired

      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await instance.post("/users/login/refresh/", {
            refresh: TokenService.getLocalRefreshToken(),
          });

          const { access } = rs.data;

          TokenService.updateLocalAccessToken(access);

          return instance(originalConfig);
        } catch (_error) {
          console.log("error 2: ", _error);
          if (_error.response.status === 401) {
            //refresh token was expired
            originalConfig._retry = true;
            TokenService.removeUser();

            return instance(originalConfig);
          }
          return Promise.reject(_error);
        }
      }
    }
    console.log("error 1: ", err);
    return Promise.reject(err);
  }
);

export default instance;
