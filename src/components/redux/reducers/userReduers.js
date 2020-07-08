import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  MARK_NOTIFICATION_READ,
} from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { authenticated: true, loading: false, ...action.payload };
    case SET_AUTHENTICATED:
      return { ...state, authenticated: true };
    case SET_UNAUTHENTICATED:
      return initialState;
    case LOADING_USER:
      return { ...state, loading: true };
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId,
          },
        ],
      };
    case UNLIKE_SCREAM:
      const likes = state.likes.filter(
        (obj) => obj.screamId !== action.payload.screamId
      );
      return { ...state, likes: likes };
    case MARK_NOTIFICATION_READ:
      state.notifications.forEach((notification) => (notification.read = true));
      return { ...state };
    default:
      return state;
  }
}
