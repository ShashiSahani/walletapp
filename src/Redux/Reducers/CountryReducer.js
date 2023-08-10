import * as actionType from "../Action/Action";
const initialState = {
  countries: {
    data: null,
    error: null,
    status: "idle",
    isLoading: false,
  },
};

const CountryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_COUNTRY:
      return {
        ...state,
        countries: {
          error: null,
          data: [],
          status: "loading",
          isLoading: true,
        },
      };
    case actionType.GET_COUNTRY_SUCCESS:
      return {
        ...state,
        countries: {
          error: null,
          data: action?.countries?.data?.data,
          status: "success",
          isLoading: false,
        },
      };
    case actionType.GET_COUNTRY_FAIL:
      return {
        ...state,
        countries: {
          error: action?.countriesErrData,
          data: [],
          status: "fail",
          isLoading: false,
        },
      };
    default:
      return state;
  }
};
export default CountryReducer;
