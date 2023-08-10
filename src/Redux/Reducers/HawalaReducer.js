import * as actionType from '../Action/Action'
const initialState = {
  hawalalist_data: null,
  client_list: null,
  isLoading: false,
  error: null,
}

const HawalaReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.HAWALA_LIST:
      return {
        ...state,
        isLoading: true,
        error: '',
      }
    case actionType.GET_HAWALA_LIST_SUCCESS:
      return {
        ...state,
        hawalalist_data: action.data,
        isLoading: false,
      }
    case actionType.GET_HAWALA_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case actionType.CLIENT_LIST:
      return {
        ...state,
        isLoading: true,
        error: '',
      }
    case actionType.GET_CLIENT_LIST_SUCCESS:
      return {
        ...state,
        client_list: action.data,
        isLoading: false,
      }
    case actionType.GET_CLIENT_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }

    default:
      return state
  }
}
export default HawalaReducer
