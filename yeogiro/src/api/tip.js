import {localAxios} from '@/util/http-commons';

const local = localAxios();

const tipCategory = async (success, fail) => {
  local.get(`/tips`).then(success).catch(fail);
};

const tipList = async (success, fail) => {
  local.get(`/tips/minor`).then(success).catch(fail);
};

const tipDetail = async (tipId, success, fail) => {
  local.get(`/tips/minor/${tipId}`).then(success).catch(fail);
};

export {tipCategory, tipList, tipDetail};
