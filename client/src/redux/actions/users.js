import axios from "axios";
import { ADD_USER, GET_ALL_USERS, SAVE_USER, CLEAN_USER, CLEAN_USER_CART } from "./index";
import { headers } from "../../utils/GetHeaders"

const { REACT_APP_SERVER } = process.env;

export function addUser(user) {
  return async (dispatch) => {
    try {
      await axios.post(`${REACT_APP_SERVER}/users`, user, { headers });
      dispatch({
        type: ADD_USER,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllUsers() {
  return async (dispatch) => {
    try {
      const users = await axios.get(`${REACT_APP_SERVER}/users`, { headers });
      return dispatch({
        type: GET_ALL_USERS,
        payload: users.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//Cuando inicia sesión el usuario, se envían los datos a la DB para guardarse y volver con la información actualizada
export function saveUser(user, headers) {
  return async (dispatch) => {
    try {
      const userDB = await axios.post(
        `${REACT_APP_SERVER}/users`,
        { user },
        { headers }
      );
      return dispatch({
        type: SAVE_USER,
        payload: userDB.data,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export function cleanUser() {
  return {
    type: CLEAN_USER,
  };
}

export function cleanUserCart() {
  return {
    type: CLEAN_USER_CART,
  };
}
