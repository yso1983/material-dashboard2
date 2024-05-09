import axios from "axios";

// axios.defaults.baseURL = process.env.REACT_APP_AXIOS_API_baseURL;
const instance = axios.create({
  baseURL: process.env.REACT_APP_AXIOS_API_baseURL,
  timeout: 5000,
});

export default instance;
