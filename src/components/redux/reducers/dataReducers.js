import {
  SET_SCREAMS,
  SET_SCREAM,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  SUBMIT_COMMENT,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
} from '../types';

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SCREAMS:
      return { ...state, screams: action.payload, loading: false };
    case SET_SCREAM:
      return { ...state, scream: action.payload };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      const index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId)
        state.scream = action.payload;
      return { ...state };
    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments],
        },
      };
    case LOADING_DATA:
      return { ...state, loading: true };
    case DELETE_SCREAM:
      const screams = state.screams.filter(
        (obj) => obj.screamId !== action.payload.screamId
      );
      return { ...state, screams: screams };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };
    default:
      return state;
  }
}
