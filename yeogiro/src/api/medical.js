import {localAxios} from '@/util/http-commons';

const local = localAxios();

const hospitalList = async (success, fail) => {
  local.get(`/map/hospital`).then(success).catch(fail);
};

const pharmacyList = async (success, fail) => {
  local.get(`/map/pharmacy`).then(success).catch(fail);
};

export {hospitalList, pharmacyList};
