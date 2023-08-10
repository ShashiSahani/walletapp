import axios from "axios";
export const base_url = 'https://paindustry.in/booky/api'

export function* UserRegistrationApi(registratedData) {
  const registration = yield axios
    .post(`${base_url}/register`, registratedData)
    .then(function (response) {
      console.log("res",response)
      return response;
    })
    .catch(function (error) {
      console.log("error",error)

      return error.response;
    });

  return registration;
}
export function* UserLoginApi(loggedData) {

  const login = yield axios
    .post(`${base_url}/login`, loggedData)
    .then(function (response) {
      console.log("response",response)
      return response;
    
    })
    .catch(function (error) {
      console.log("error",error)

      return error.response;
    });

  return login;
}

export function* SendOtpApi(payload) {
  const otp = yield axios
    .post(`${base_url}/otpsend`, payload)
    .then(function (response) {
      console.log('response>>>>>>>>>>',response)
      return response;
    })
    .catch(function (error) {
      return error.response;
    });

  return otp;
}

export function* VerifyOtpApi(payload) {
  const otpdata = yield axios
    .post(`${base_url}/confirmotp`, payload)
    .then(function (response) {
      console.log("respose of verify otp",response)
      return response;
    })
    .catch(function (error) {
      return error.response;
    });

  return otpdata;
}
export function* GetUserDetailApi(userdetailData) {
  const UserDetail = yield axios
    .post(`${base_url}/userdeatils`, userdetailData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });

  return UserDetail;
}

export function* ForgetPasswordApi(ForgetPasswordDetails) {
  const forgetpassword = yield axios
    .post(`${base_url}/forgetpassword`, ForgetPasswordDetails)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      return error.response
    })
  return forgetpassword
}

export function* ChangePasswordApi(changepassDetails) {
  const changePassword = yield axios
    .post(`${base_url}/changepassword`, changepassDetails)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      return error.response
    })
  return changePassword
}
