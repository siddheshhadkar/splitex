import config from "../environments/production";
import axios from "axios";

const instance = axios.create({
  baseURL: config.baseUrl,
  timeout: 10000,
});

export default instance;
