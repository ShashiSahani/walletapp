import * as actionType from "../Action/Action";
const initialState = {
    transactions: {
    data: null,
    error: null,
    isLoading: false,
  },
};

const TransactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_TRANSACTIONS_LIST:
      return {
        ...state,
        transactions: {
          error: null,
          data: [],
          isLoading: true,
        },
      };
    case actionType.GET_TRANSACTIONS_LIST_SUCCESS:
      return {
        ...state,
        transactions: {
          error: null,
          data: action?.transactions?.data?.data,
          isLoading: false,
        },
      };
    case actionType.GET_TRANSACTIONS_LIST_FAIL:
      return {
        ...state,
        transactions: {
          error: action?.transactionsErrData,
          data: [],
          isLoading: false,
        },
      };
    default:
      return state;
  }
};
export default TransactionReducer;
