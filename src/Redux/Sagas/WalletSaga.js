import {
  GetHawalaListApi,
  GetClientListApi,
  GetCountryApi,
  GetWallwtBalanceApi,
  WithDrawRequestApi,
  ThridPartyTransactionApi,
  DealerUserApi,
  GetCashDepositListApi,

} from "../api/WalletApi";
import { call, all, takeEvery, put } from "redux-saga/effects";
import * as actionType from "../Action/Action";
import { Alert } from "react-native";

function* getCountries() {
  const countries = yield call(GetCountryApi);

  if (countries?.status === 200) {
    yield put({
      type: actionType.GET_COUNTRY_SUCCESS,
      countries,
    });
  } else {
    yield put({
      type: actionType.GET_COUNTRY_FAIL,
      countriesErrData: countries,
    });
  }
}

function* GetHawalaListsaga() {
  const hawalaList = yield call(GetHawalaListApi);

  const data = hawalaList?.data.data;
  if (hawalaList?.status === 200) {
    yield put({
      type: actionType.GET_HAWALA_LIST_SUCCESS,
      data,
    });
  } else {
    yield put({
      type: actionType.GET_HAWALA_LIST_FAIL,
      ErrData: data,
    });
  }
}
function* GetClientListsaga() {
  const clientList = yield call(GetClientListApi);

  const data = clientList?.data.data;
  if (clientList?.status === 200) {
    yield put({
      type: actionType.GET_CLIENT_LIST_SUCCESS,
      data,
    });
  } else {
    yield put({
      type: actionType.GET_CLIENT_LIST_FAIL,
      ErrData: data,
    });
  }
}

function* GetWalletBalanceSaga(payload) {
  const { walletData } = payload;
  const walletBalData = yield call(GetWallwtBalanceApi, walletData);
  const data = walletBalData?.data.data;
  if (walletBalData.data.ok === true) {
    yield put({
      type: actionType.GET_WALLET_BALANCE_SUCCESS,
      data,
    });
  } else {
    yield put({
      type: actionType.GET_WALLET_BALANCE_FAIL,
      ErrData: walletBalData,
    });
  }
}
function* WithDrawRequestSaga(payload) {
  const { withDrawData } = payload;
  const withDrawDataRes = yield call(WithDrawRequestApi, withDrawData);
  const data = withDrawDataRes?.data;
  if (withDrawDataRes.data.ok === true) {
    yield put({
      type: actionType.WITHDRAW_REQUEST_SUCCESS,
      data,
    });
    Alert.alert("Request Send !");
  } else {
    yield put({
      type: actionType.WITHDRAW_REQUEST_FAIL,
      ErrData: withDrawDataRes,
    });
    Alert.alert(data?.message);
  }
}

function* ThirdPartyTransactionSaga(payload) {
  const { TransData } = payload;
  console.log("payload",TransData)
  const TransDataRes = yield call(ThridPartyTransactionApi, TransData);
  const data = TransDataRes?.data;
  if (TransDataRes.data.ok === true) {
    yield put({
      type: actionType.THIRD_PARTY_TRANSACTION_SUCCESS,
      data,
    });
    Alert.alert("Request Send !");
  } else {
    yield put({
      type: actionType.THIRD_PARTY_TRANSACTION_FAIL,
      ErrData: TransDataRes,
    });
    Alert.alert(data?.message);
  }
}

function* GetCashDepositListsaga() {
  const CashDepositList = yield call(GetCashDepositListApi);

  const data = CashDepositList?.data.data;
  if (CashDepositList?.status === 200) {
    yield put({
      type: actionType.GET_CASH_DEPOSIT_LIST_SUCCESS,
      data,
    });
  } else {
    yield put({
      type: actionType.GET_CASH_DEPOSIT_LIST_FAIL,
      ErrData: data,
    });
  }
}
function* DealerSaga(payload) {
  const { userId } = payload;
  const data = yield call(DealerUserApi, userId);
  if (data.data.ok === true) {
    Alert.alert("Send Request SuccesFully!");
  }
}

function* WalletSaga() {
  yield all([takeEvery(actionType.GET_COUNTRY, getCountries)]);
  yield all([takeEvery(actionType.HAWALA_LIST, GetHawalaListsaga)]);
  yield all([takeEvery(actionType.CLIENT_LIST, GetClientListsaga)]);
  yield all([takeEvery(actionType.CASH_DEPOSIT_LIST, GetCashDepositListsaga)]);
  yield all([takeEvery(actionType.GET_WALLET_BALANCE, GetWalletBalanceSaga)]);
  yield all([takeEvery(actionType.WITHDRAW_REQUEST, WithDrawRequestSaga)]);
  yield all([
    takeEvery(actionType.THIRD_PARTY_TRANSACTION, ThirdPartyTransactionSaga),
  ]);
  yield all([takeEvery(actionType.BECOME_DEALER_REQUEST, DealerSaga)]);
}
export default WalletSaga;
