import axios from "axios";

const config = {
  headers: {
    "Access-Control-Allow-Credentials": true,
    'Accept': 'application/json',
  },
  withCredentials: true
};

export const ApiUtil = {
  init(baseURL) {
    axios.defaults.baseURL = baseURL;
  },

  get(resource) {
    return axios.get(resource, config)
  },

  post(resource, data) {
    return axios.post(resource, data, config)
  },

  put(resource, data) {
    return axios.put(resource, data, config)
  },

  delete(resource) {
    return axios.delete(resource, config)
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/
  customRequest(data) {
    return axios(data)
  }
}
