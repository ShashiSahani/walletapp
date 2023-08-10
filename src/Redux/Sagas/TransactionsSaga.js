import { GetTransactionsApi } from "../api/transactionApi";
import { call, all, takeEvery, put } from "redux-saga/effects";
import * as actionType from "../Action/Action";
function* getTransactions(payload) {
  const { transactionPayload } = payload;

  const transactions = yield call(GetTransactionsApi, transactionPayload);

  if (transactions?.status === 200) {
    yield put({
      type: actionType.GET_TRANSACTIONS_LIST_SUCCESS,
      transactions,
    });
  } else {
    yield put({
      type: actionType.GET_TRANSACTIONS_LIST_FAIL,
      transactionsErrData: transactions,
    });
  }
}

function* TransactionsSaga() {
  yield all([takeEvery(actionType.GET_TRANSACTIONS_LIST, getTransactions)]);
}
export default TransactionsSaga;
