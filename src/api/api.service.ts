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

const request = async (method: string, url: string, data = {}, config = {}) => {
  const headers = {}

  const request = {
    headers: { ...headers },
    method,
    url,
    data: {},
    params: {},
    ...config,
  }

  if (!_.isEmpty(data)) {
    if (method?.toLowerCase() !== 'get') request.data = data
    else if (method?.toLowerCase() === 'get') request.params = data
  }
  return axios_instance(request)
}

const res = {
  delete: (url: string, data = {}) => request('delete', url, data),
  get: (url: string, data = {}) => request('get', url, data),
  patch: (url: string, data = {}) => request('patch', url, data),
  post: (url: string, data = {}) => {
    return request('post', url, data)
  },
  put: (url: string, data = {}) => request('put', url, data),
}

export default res

export { axios_instance }
