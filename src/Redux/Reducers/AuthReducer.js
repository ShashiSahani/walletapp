import * as actionType from "../Action/Action"
const initialState = {
  data: null,
  error: null,
  isLoading: false,
  userDetail: null,
  otpVerification: null,
  loginData: null,
  isLogin:false,
  logout:null
};

const AuthReducer = (state = initialState, action) => {
  console.log("action",action)
  switch (action.type) {
    case actionType.USER_REGISTRATION:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionType.USER_REGISTRATION_SUCCESS:
      return {
        ...state,

        data: action?.regData,
        isLoading: false,
        error: null,
      };
    case actionType.USER_REGISTRATION_FAIL:
      return {
        ...state,

        error: action?.regErrData,
        isLoading: false,
      };
    case actionType.EMPTY_USER:
      return {
        ...state,

        error: null,
        data: null,
        isLoading: false,
      };
    case actionType.GET_USER_DETAILS:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionType.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetail: action.data,
        isLoading: false,
      };
    case actionType.GET_USER_DETAILS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionType.VERIFY_OTP:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionType.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        loginData: action?.otpResp,
        isLoading: false,
        error: null,
      };
    case actionType.VERIFY_OTP_FAIL:
      return {
        ...state,
        error: action?.otpRespErr,
        isLoading: false,
      };

    case actionType.USER_LOGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionType.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loginData: action?.loginData,
        isLoading: false,
        error: null,
      };
    case actionType.USER_LOGIN_FAIL:
      return {
        ...state,
        error: action?.loginErrData,
        isLoading: false,
      };
      case actionType.USER_LOG_OUT_STATUS:
        return {
          ...state,
          logout:action.logoutStatus
        };
        case actionType.USER_LOG_OUT_SUCCESS:
      return {
        ...state,
        logout: action?.logout,
        isLoading: false,
        error: null,
      };
    case actionType.USER_LOG_OUT_FAIL:
      return {
        ...state,
        error: action?.logoutErrData,
        isLoading: false,
      };
      case actionType.USER_LOG_OUT_STATUS:
        return {
          ...state,
        logout:action.logoutstatus
        };
      
    default:
      return state;
  }
};
export default AuthReducer;
