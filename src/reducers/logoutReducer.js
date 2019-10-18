import { CLEANUP_MESSAGES } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEANUP_MESSAGES:
      return {
        ...state,
        errors: null
      };
    default:
      return state;
  }
}
