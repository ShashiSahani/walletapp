import axios from "axios";
export const base_url = `https://paindustry.in/booky/api`;


// Get Country List
export function* GetCountryApi() {
  const countries = yield axios
    .post(`${base_url}/country`)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return countries;
}

// get depositDetail
export function* GetDepositDetailApi() {
  const depositDetail = yield axios
    .post(`https://anjanibooks.live/dashboard/api/getdepositdetail`)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return depositDetail;
}
// request Deposit
export function* RequestDepositApi(formData) {
  const ReqDeposit = yield axios
    .post(`${base_url}/depositrequest`, formData)
    .then(function (response) {
      console.log(response, "upload done");
      return response;
    })
    .catch(function (error) {
      console.log(error, "upload error");

      return error.response;
    });
  return ReqDeposit;
}

export function* GetCashDepositListApi() {
  const CashDepositList = yield axios
    .post(`${base_url}/hawalalist`)
    .then(function (response) {
      console.log("res<>>>>>>>>>>>>>",response)
      return response;
    })
    .catch(function (error) {
      return error.response;
    });

  return CashDepositList;
}
// GET HAWALA LIST
export function* GetHawalaListApi() {
  const hawalaList = yield axios
    .post(`${base_url}/hawalalist`)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });

  return hawalaList;
}
// GET CLIENT DETAILS
export function* GetClientListApi() {
  const clientList = yield axios
    .post(`${base_url}/clilentlist`)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });

  return clientList;
}

// get wallet balance

export function* GetWallwtBalanceApi(walletData) {
  const walletBal = yield axios
    .post(`${base_url}/getwalletbalance`, walletData)
    .then(function (response) {
      console.log("response<><><><><<<> ",response)
      return response;
    })
    .catch(function (error) {
      console.log("error",error)
      return error.response;
    });
  return walletBal;
}

// withdraw request
export function* WithDrawRequestApi(withDrawData) {
  const withDrawDataRes = yield axios
    .post(`${base_url}/widrequest`, withDrawData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return withDrawDataRes;
}

// Third PARTY Transaction
export function* ThridPartyTransactionApi(TransData) {
  const TransDataRes = yield axios
    .post(`${base_url}/thirdpatyrequest`, TransData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return TransDataRes;
}
export function* DealerUserApi(userId) {
  const dealerUser = yield axios
    .post(`${base_url}/asdealor`, userId)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return dealerUser;
}
