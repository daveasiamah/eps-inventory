import { GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import axios from "axios";

import baseServerUri from "../utils/baseServerUri";

//Register User
export const registerUser = (userData, history) => dispatch => {
  try {
    axios
      .post(`${baseServerUri}/api/users`, userData)
      .then(res => {
        // console.log(res.data.message);
        history.push("/login");
        dispatch({
          type: CLEAR_ERRORS,
          payload: null
        });
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

//Login User
export const loginUser = userData => dispatch => {
  try {
    axios
      .post(`${baseServerUri}/api/login`, userData, {
        headers: { "Content-Type": "application/json" }
      })
      .then(res => {
        //Save to localStorage
        //   console.log(res.data);
        const { Token } = res.data;
        //Set token to localStorage
        localStorage.setItem("jwtToken", Token);
        //Set token to Auth header
        setAuthToken(Token);
        //Decode token to get current user
        const decoded = jwt_decode(Token);
        dispatch(setCurrentUser(decoded));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.message
        })
      );
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.message
    });
  }
};

//Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // console.log("User logged out!");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
