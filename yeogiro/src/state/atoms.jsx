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

const bottomSheetState = atom({
  key: 'bottomSheetState',
  default: {isOpen: false, index: 1},
});

const pathDataState = atom({
  key: 'pathDataState',
  default: null,
});

export {
  hospitalState,
  pharmacyState,
  shelterState,
  selectedFacilityIdState,
  bottomSheetState,
  pathDataState,
};
