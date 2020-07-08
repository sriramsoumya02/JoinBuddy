import axios from 'axios';

//axios.defaults.BaseURL=process.env.REACT_APP_BASE_URL;
axios.interceptors.response.use(null, function (err) {
  const expectedError =
    err.response && err.response.status >= 400 && err.response.status < 500;
  if (!expectedError) {
    console.log(err.response);
  }
  return Promise.reject(err);
});
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
