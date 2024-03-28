import {localAxios} from '@/util/http-commons';

const local = localAxios();

const shortPathFind = async (success, fail) => {
  local.get(``).then(success).catch(fail);
};

export {};
