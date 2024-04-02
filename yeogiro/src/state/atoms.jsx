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

const bottomSheetState = atom({
  key: 'bottomSheetState',
  default: {isOpen: false, index: 1},
});

const pathDataState = atom({
  key: 'pathDataState',
  default: [],
});

const loadingState = atom({
  key: 'loadingState',
  default: false,
});

const emergencyState = atom({
  key: 'emergencyState',
  default: {
    isVisible: false,
  },
});

export {
  hospitalState,
  pharmacyState,
  shelterState,
  bottomSheetState,
  pathDataState,
  loadingState,
  emergencyState,
};
