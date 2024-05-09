import apiService from "../api";

const API_URL = "/api/auth/";

const authService = {
  async login(user) {
    return apiService
      .post(API_URL + "signin", {
        email: user.email,
        password: user.password,
        login_type: user.login_type ?? "",
      })
      .then((response) => {
        if (response && response.accessToken) {
          localStorage.setItem("user", JSON.stringify(response));
        }
        return response;
      });
  },

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("groupid");
  },

  register(user) {
    return apiService.post(API_URL + "signup", user);
  },

  refresh() {
    const user = JSON.parse(localStorage.getItem("user"));

    return apiService
      .post(API_URL + "refresh", {}, { headers: { refresh: user.accessToken } })
      .then((response) => {
        if (response && response.code === "0000" && response.accessToken) {
          let user = JSON.parse(localStorage.getItem("user"));
          user.accessToken = response.accessToken;
          user.refreshToken = response.refreshToken;
          localStorage.setItem("user", JSON.stringify(user));
          return response;
        } else {
          return null;
        }
      });
  },

  check() {
    return apiService.post(API_URL, {}).then((res) => {
      if (res.data) {
        return res.data.code;
      } else {
        return "9999";
      }
    });
  },
};

export default authService;
