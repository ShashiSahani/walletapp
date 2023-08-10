import { all } from "redux-saga/effects";
import AuthSaga from "./Sagas/AuthSaga";
import WalletSaga from "./Sagas/WalletSaga";
import DepositSaga from "./Sagas/DepositeSaga";
import TransactionSaga from "./Sagas/TransactionsSaga";
function* rootSaga() {
  yield all([AuthSaga(), WalletSaga(), DepositSaga(), TransactionSaga()]);
}
export default rootSaga;
