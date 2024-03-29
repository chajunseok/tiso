import {localAxios} from '../util/http-commons';

const shelterCategory = async (lat, lng, shelterType, success, fail) => {
  localAxios
    .get(`/shelters/type?lat=${lat}&lng=${lng}&type=${shelterType}`)
    .then(success)
    .catch(fail);
};

const shelterList = async (type, success, fail) => {
  localAxios.get(`/map/shelter/${type}`).then(success).catch(fail);
};

export {shelterCategory, shelterList};
