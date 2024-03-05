import {localAxios} from '@/util/http-commons';

const local = localAxios();

const shelterCategory = async (success, fail) => {
  local.get(`/map/shelter`).then(success).catch(fail);
};

const shelterList = async (type, success, fail) => {
  local.get(`/map/shelter/${type}`).then(success).catch(fail);
};

export {shelterCategory, shelterList};
