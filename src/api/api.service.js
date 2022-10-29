import axios from 'axios'
import _ from 'lodash'

const API_URL = 'https://jabama-devjobs-api.vercel.app/'

const axios_instance = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const request = async (method, url, data = {}, config = {}) => {
  const headers = {}

  const request = {
    headers: { ...headers },
    method,
    url,
    ...config,
  }

  if (!_.isEmpty(data)) {
    if (method?.toLowerCase() !== 'get') request.data = data
    else if (method?.toLowerCase() === 'get') request.params = data
  }
  return axios_instance(request)
}

const res = {
  delete: (url, data = {}) => request('delete', url, data),
  get: (url, data = {}) => request('get', url, data),
  patch: (url, data = {}) => request('patch', url, data),
  post: (url, data = {}) => {
    return request('post', url, data)
  },
  put: (url, data = {}) => request('put', url, data),
}

export default res

export { axios_instance }
