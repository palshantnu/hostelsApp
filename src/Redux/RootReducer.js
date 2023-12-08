const initialState = {
    user: {},
    isLoggedIn: false,
    isFirstLoggedIn: false,
    type: 'user',
    logintype: '',
    userdetails:{},
  };
  
  export const RootReducer = (state = initialState, action) => {
    switch (action.type) {

  
      case 'SET_USER':
        state.user = action.payload;
        state.isLoggedIn = true;
        // state.isFirstLoggedIn = true;
        return {
          ...state,
          user: state.user,
          isLoggedIn: state.isLoggedIn,
          // isFirstLoggedIn: state.isFirstLoggedIn,
        };
       
      case 'LOGOUT':
        state.user = {};
        state.isLoggedIn = false;
        return {
          ...state,
        };
        case 'FIRSTLOGIN':
          state.user = {};
          state.isFirstLoggedIn = true;
          return {
            ...state,
          };
      default:
        return state;
    }
  };
  