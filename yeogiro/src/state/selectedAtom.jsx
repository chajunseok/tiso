import {atom} from 'recoil';

const selectedHospitalIdState = atom({
  key: 'selectedHospitalIdState',
  default: null,
});

const selectedPharmacyIdState = atom({
  key: 'selectedPharmacyIdState',
  default: null,
});

const selectedFacilityIdState = atom({
  key: 'selectedFacilityIdState',
  default: null,
});

export {
  selectedHospitalIdState,
  selectedPharmacyIdState,
  selectedFacilityIdState,
};
