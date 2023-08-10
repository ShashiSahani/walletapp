import * as actionType from "../Action/Action";
const initialState = {
  wallet_bal: null,
  withDraw_req: null,
  third_party: null,
  isLoading: false,
  error: null,
};

const WalletReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_WALLET_BALANCE:
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case actionType.GET_WALLET_BALANCE_SUCCESS:
      return {
        ...state,
        wallet_bal: action.data,
        isLoading: false,
      };
    case actionType.GET_WALLET_BALANCE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionType.WITHDRAW_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case actionType.WITHDRAW_REQUEST_SUCCESS:
      return {
        ...state,
        withDraw_req: action.data,
        isLoading: false,
      };
    case actionType.WITHDRAW_REQUEST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case actionType.THIRD_PARTY_TRANSACTION:
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case actionType.THIRD_PARTY_TRANSACTION_SUCCESS:
      return {
        ...state,
        third_party: action.data,
        isLoading: false,
      };
    case actionType.THIRD_PARTY_TRANSACTION_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
export default WalletReducer;
