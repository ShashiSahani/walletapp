import * as actionType from "./Action";
export const loginClick = (payload) => {
  console.log("payload",payload)
  return {
    type: actionType.USER_LOGIN,
    loggedData: payload,
  };
};

export const GetUserDetails = (payload) => {
  return {
    type: actionType.GET_USER_DETAILS,
    userdetailData: payload,
  };
};
export const registrationClick = (payload) => {
  console.log("payload",payload)
  return {
    type: actionType.USER_REGISTRATION,
    registratedData: payload,
  };
};

export const emptyUser = () => {
  return {
    type: actionType.EMPTY_USER,
  };
};

export const sendOtp = (payload) => {
  return {
    type: actionType.SEND_OTP,
    otp: payload,
  };
};

export const verifyOtp = (payload) => {
console.log("payLoad of verifyotp",payload)
  return {
    type: actionType.VERIFY_OTP,
    otpData: payload,
  };
};
export const Forgetpassword = (payload) => {
  console.log('payload',payload)
  return {
    type: actionType.FORGET_PASSWORD,
    ForgetPasswordDetails: payload,
  };
};

export const LoginStatus = (loginStatus) => {
  console.log("loginStatus",loginStatus)
  return {
    type: actionType.USER_LOGIN_STATUS,
    loginStatus,
  };
};
export const LogoutStatus = (logoutStatus) => {
  console.log("loginStatus",logoutStatus)
  return {
    type: actionType.USER_LOG_OUT_STATUS,
    logoutStatus,
  };
};
export const ChangePassword = (changepassDetails) => {
  return {
    type: actionType.CHANGE_PASSWORD,
    changepassDetails,
  };
};
