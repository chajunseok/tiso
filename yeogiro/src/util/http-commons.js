import axios from 'axios';
import Config from 'react-native-config';

const {YEOGIRO_API_URL, NAVER_MAP_CLIENT_ID, NAVER_MAP_CLIENT_SECRET} = Config;

function localAxios() {
  const instance = axios.create({
    baseURL: YEOGIRO_API_URL,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
  return instance;
}

function nmId() {
  console.log('ID 함수 실행');
  const ID = NAVER_MAP_CLIENT_ID;
  console.log(`nmId is called, value: ${ID}`);
  return ID;
}

function nmSecret() {
  console.log('nmSecret 함수 실행');
  const SECRET = NAVER_MAP_CLIENT_SECRET;
  console.log(`nmSecret is called, value: ${SECRET}`);
  return SECRET;
}
