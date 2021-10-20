import {
  ADD_INVENTORY,
  INVENTORY_LOADING,
  GET_INVENTORY
} from "../actions/types";

const initialState = {
  inventory: null,
  inventoryList: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INVENTORY_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_INVENTORY:
      return {
        ...state,
        inventory: action.payload,
        loading: false
      };
    case GET_INVENTORY:
      return {
        ...state,
        inventory: null
      };
    default:
      return state;
  }
}
