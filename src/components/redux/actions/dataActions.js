import axios from 'axios';
import http from '../../../services/httpServices';
import {
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_SCREAMS,
  SET_SCREAM,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  POST_SCREAM,
  DELETE_SCREAM,
  LOADING_UI,
  LOADING_DATA,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from '../types';

export const getScreams = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  console.log(' getScreams request started');
  try {
    const result = await http.get('/screams');
    dispatch({ type: SET_SCREAMS, payload: result.data });
  } catch (ex) {
    dispatch({ type: SET_SCREAMS, payload: [] });
  }
};
export const getScream = (screamId) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  console.log(' getScream request started');
  try {
    const result = await http.get('/screams/' + screamId);
    dispatch({ type: SET_SCREAM, payload: result.data });
    dispatch({ type: STOP_LOADING_UI });
  } catch (ex) {
    dispatch({ type: SET_SCREAM, payload: {} });
  }
};
export const postScream = (screamData) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  console.log(' postScream request started');
  try {
    const result = await http.post('/screams');
    dispatch({ type: POST_SCREAM, payload: result.data });
    dispatch({ type: CLEAR_ERRORS });
  } catch (ex) {
    dispatch({ type: SET_ERRORS, payload: ex.response.data });
  }
};

export const likeScream = (screamId) => async (dispatch) => {
  console.log(' likeScream request started');
  try {
    const result = await http.post(`/screams/${screamId}/like`, {});
    dispatch({ type: LIKE_SCREAM, payload: result.data });
  } catch (ex) {
    console.log(ex);
  }
};
export const unlikeScream = (screamId) => async (dispatch) => {
  console.log('un likeScream request started');
  try {
    const result = await http.post(`/screams/${screamId}/unlike`, {});
    dispatch({ type: UNLIKE_SCREAM, payload: result.data });
  } catch (ex) {
    console.log(ex);
  }
};

export const submitComment = (screamId, commentData) => async (dispatch) => {
  console.log('commentScream request started');
  try {
    const result = await http.post(`/screams/${screamId}/comment`, commentData);
    dispatch({ type: SUBMIT_COMMENT, payload: result.data });
    dispatch({ type: CLEAR_ERRORS });
  } catch (ex) {
    dispatch({ type: SET_ERRORS, payload: ex.response.data });
  }
};

export const deleteScream = (screamId) => async (dispatch) => {
  console.log('deleteScream request started');
  try {
    const result = await http.delete(`/screams/${screamId}`);
    dispatch({ type: DELETE_SCREAM, payload: result.data });
  } catch (ex) {
    console.log(ex);
  }
};

export const getUserData = (userHandle) => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  console.log(' getUserData request started');
  try {
    const result = await http.get(`/user/${userHandle}`);
    dispatch({ type: SET_SCREAMS, payload: result.data.screams });
  } catch (ex) {
    dispatch({ type: SET_SCREAMS, payload: null });
  }
};
