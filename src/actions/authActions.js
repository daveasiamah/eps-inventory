import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import axios from "axios";

//Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/users", userData)
    .then(res => {
      console.log(res.data.message);
      history.push("/login");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login User
export const loginUser = userData => dispatch => {
  axios
    .post("http://localhost:5000/api/login", userData, {
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
        payload: err
      })
    );
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
  console.log("User logged out!");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
