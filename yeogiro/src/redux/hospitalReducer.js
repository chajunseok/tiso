export const SET_HOSPITALS = 'SET_HOSPITALS';
export const saveHospitals = hospitals => {
  return {
    type: SET_HOSPITALS,
    hospitals,
  };
};

const initialState = {
  hospitals: [],
};

const hospitalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_HOSPITALS':
      return {
        ...state,
        hospitals: action.hospitals,
      };
    default:
      return state;
  }
};

export default hospitalReducer;
