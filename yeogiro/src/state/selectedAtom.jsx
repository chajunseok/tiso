import {atom} from 'recoil';

const selectedHospitalIdState = atom({
  key: 'selectedHospitalIdState',
  default: null,
});

const selectedPharmacyIdState = atom({
  key: 'selectedHospitalIdState',
  default: null,
});

export {selectedHospitalIdState, selectedPharmacyIdState};
