import { SET_USER, RESET_USER } from "../actions/authActions";

const initialState = {
  isLoggedIn: false,
  user: null,
  userId: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      state = {
        isLoggedIn: true,
        user: action.payload.providerData[0],
        userId: action.payload.uid,
      };
      return state;
    case RESET_USER:
      state = initialState;
      return state;
    default:
      return state;
  }
}
