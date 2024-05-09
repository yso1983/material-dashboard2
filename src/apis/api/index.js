import instance from "../utils/instance";

//요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    //요청 보내기 전에 수행 로직
    const user = JSON.parse(localStorage.getItem("user"));
    const groupid = localStorage.getItem("groupid");
    if (user && user.accessToken) {
      config.headers["Authorization"] = `Bearer ${user.accessToken}`;
      config.headers["groupid"] = `${groupid}`;
    }
    return config;
  },
  (err) => {
    //요청 에러 시 수행 로직
    return Promise.reject(err);
  }
);

//응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    //응답에 대한 로직
    return {...response.data, code: "0000"};
  },
  (err) => {
    //  debugger;
    // return Promise.reject(err);
    return err.response.data;
  }
);

const apiService = {
  get(url, params) {
    if (typeof params === "undefined") {
      return instance.get(url).catch((error) => {
        console.error(`Error : ${error}`);
      });
    } else {
      return instance.get(url, { params: params }).catch((error) => {
        console.error(`Error : ${error}`);
      });
    }
  },
  post(url, data = {}, headers = {}) {
    return instance.post(url, data, headers).catch((error) => {
      console.error(`Error : ${error}`);
    });
  },
};

export default apiService;
