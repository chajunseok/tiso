import axios from 'axios';
import Config from 'react-native-config';

const KAKAO_API_KEY = Config.KAKAO_MAP_API_KEY; // .env 파일에서 로드된 키

const headers = {
  Authorization: `KakaoAK ${KAKAO_API_KEY}`,
};

axios
  .get(
    'https://dapi.kakao.com/v2/local/search/category.json?category_group_code=HP8',
    {headers},
  )
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
