import axios from "axios";
import {
  GET_INVENTORY,
  INVENTORY_LOADING,
  GET_ERRORS,
  DELETE_INVENTORY
} from "./types";

import baseServerUri from "../../utils/baseServerUri";

//Get current Inventory data
export const getCurrentInventory = () => dispatch => {
  dispatch(setInventoryLoading());
  axios
    .get(`${baseServerUri}/api/inventory/`)
    .then(res =>
      dispatch({
        type: GET_INVENTORY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_INVENTORY,
        payload: { err }
      })
    );
};

//Inventory loading
export const setInventoryLoading = () => {
  return {
    type: INVENTORY_LOADING
  };
};

//Add Inventory
export const addInventory = (inventoryData, history) => dispatch => {
  axios
    .post(`${baseServerUri}/api/inventory/`, inventoryData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete Inventory
export const deleteInventory = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete(`${baseServerUri}/api/inventory/`)
      .then(res =>
        dispatch({
          type: DELETE_INVENTORY,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          error: err.res.data
        })
      );
  }
};
