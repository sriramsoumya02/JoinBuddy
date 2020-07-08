import http from './httpServices';
const apiBackendUrl = process.env.REACT_APP_BASE_URL + '/screams';

function getScreamUrl(id, action = '') {
  if (action.trim() !== '') return `${apiBackendUrl}/${id}/${action}`;
  return `${apiBackendUrl}/${id}`;
}

export function getAllScreams() {
  return http.get('/screams');
}
export function createScream(newScream) {
  return http.post(apiBackendUrl, newScream);
}
export function getScream(screamId) {
  return http.get(getScreamUrl(screamId));
}
export function createComment(screamId, newComment) {
  return http.post(getScreamUrl(screamId, 'comment'), newComment);
}

export function likeScream(screamId) {
  return http.get(getScreamUrl(screamId, 'like'));
}

export function unlikeScream(screamId) {
  return http.get(getScreamUrl(screamId, 'unlike'));
}
export function deleteScream(screamId) {
  return http.delete(getScreamUrl(screamId));
}
