import axios from "axios";
import Config from "react-native-config";

const { YEOGIRO_API_URL } = Config;

function localAxios() {
  const instance = axios.create({
    baseURL: YEOGIRO_API_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}