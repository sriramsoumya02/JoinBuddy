import Axios from 'axios';
import http from '../../../services/httpServices';
import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_USER,
  MARK_NOTIFICATION_READ,
  LOADING_UI,
  SET_UNAUTHENTICATED,
} from '../types';

export const loginUser = (userdata, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  console.log(' login request started');
  try {
    const result = await http.post('/login', userdata);
    console.log('result', result);
    setAuthoraizationHeader(result.data.token);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.replace('/');
  } catch (ex) {
    dispatch({ type: SET_ERRORS, payload: ex.response.data });
  }
};
export const signUpUser = (newUserData, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  console.log(' signUp request started');
  try {
    const result = await http.post('/signup', newUserData);
    console.log('result', result);
    setAuthoraizationHeader(result.data.token);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.replace('/');
  } catch (ex) {
    dispatch({ type: SET_ERRORS, payload: ex.response.data });
  }
};

export const getUserData = () => async (dispatch) => {
  dispatch({ type: LOADING_USER });
  try {
    const result = await http.get('/user');
    console.log('result', result);
    dispatch({ type: SET_USER, payload: result.data });
    dispatch({ type: CLEAR_ERRORS });
  } catch (ex) {
    dispatch({ type: SET_ERRORS, payload: ex.response.data });
  }
};
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('AuthToken');
  delete Axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};
export const uploadImage = (formdata) => async (dispatch) => {
  dispatch({ type: LOADING_USER });
  try {
    const result = await http.post('/user/image', formdata);
    console.log('result', result);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
  } catch (ex) {
    dispatch({ type: SET_ERRORS, payload: ex.response.data });
  }
};
export const editUserData = (userData) => async (dispatch) => {
  dispatch({ type: LOADING_USER });
  try {
    const result = await http.post('/user', userData);
    console.log('result', result);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
  } catch (ex) {
    dispatch({ type: SET_ERRORS, payload: ex.response.data });
  }
};

export const notificationMarkAsRead = (notificationIds) => async (dispatch) => {
  try {
    const result = await http.post('/notifications', notificationIds);
    console.log('result', result);
    dispatch({ type: MARK_NOTIFICATION_READ });
  } catch (ex) {
    console.log(ex);
  }
};

export const setAuthoraizationHeader = (token) => {
  localStorage.setItem('AuthToken', token);
  Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
