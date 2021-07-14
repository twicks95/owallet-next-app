const initialState = {
  data: [],
  loading: false,
  error: false,
  message: "",
};

const userData = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_PENDING": {
      return {
        ...initialState,
        loading: true,
        error: false,
      };
    }
    case "GET_USER_FULFILLED": {
      return {
        ...initialState,
        data: action.payload.data.data,
        loading: false,
        error: false,
        message: action.payload.data.msg,
      };
    }
    case "GET_USER_REJECTED": {
      return {
        ...initialState,
        loading: false,
        error: true,
        message: action.payload.response.data.msg,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default userData;
