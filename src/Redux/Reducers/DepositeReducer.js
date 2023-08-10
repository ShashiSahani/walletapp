import * as actionType from "../Action/Action";
const initialState = {
  Deposit_detail: null,
  requestDeposite: null,
  isLoading: false,
  error: null,
  reqLoading: false,
};

const DepositReducer = (state = initialState, action) => {
  // console.log(action?.reqDepositDetail?.data, "action.data");
  switch (action.type) {
    case actionType.DEPOSIT_DETAIL:
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case actionType.GET_DEPOSIT_DETAIL_SUCCESS:
      return {
        ...state,
        Deposit_detail: action.data,
        isLoading: false,
      };
    case actionType.GET_CLIENT_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionType.REQUEST_DEPOSIT:
      return {
        ...state,
        isLoading: false,
        error: "",
        reqLoading: true,
      };
    case actionType.REQUEST_DEPOSIT_SUCCESS:
      return {
        ...state,
        requestDeposite: action.reqDepositDetail.data,
        isLoading: false,
        reqLoading: false,
      };
    case actionType.REQUEST_DEPOSIT_FAIL:
      return {
        ...state,
        isLoading: false,
        reqLoading: false,
        error: action.error,
      };
    case actionType.REQUEST_DEPOSIT_EMPTY_STATE:
      return {
        ...state,
        isLoading: false,
        reqLoading: false,
        requestDeposite: null,
        error: null,
      };

    default:
      return state;
  }
};
export default DepositReducer;
