import {atom} from 'recoil';

const hospitalState = atom({
  key: 'hospitalState',
  default: [],
});

const pharmacyState = atom({
  key: 'pharmacyState',
  default: [],
});

const shelterState = atom({
  key: 'shelterState',
  default: [],
});

const selectedFacilityIdState = atom({
  key: 'selectedFacilityIdState',
  default: null,
});

export {hospitalState, pharmacyState, shelterState, selectedFacilityIdState};
