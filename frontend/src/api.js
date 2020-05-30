import {isLocalhost} from './serviceWorker'

const API_ROOT = isLocalhost ? 'http://localhost:8000/api/v1' : 'https://repostery.herokuapp.com/api/v1'
let token = null;

const options = (method='GET', data={}) => ({
  method: method,
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token? `Token ${token}`: ''
  },
  referrerPolicy: 'no-referrer', 
  body: method !== 'GET'? JSON.stringify(data) : null
})

const requests = {
  get: async (url) => {
    const response = await fetch(`${API_ROOT}${url}`, options());
    return await handleResponse(response);
  },
  post: async (url, data) => {
    const response = await fetch(`${API_ROOT}${url}`, options('POST', data))
    return await handleResponse(response);
  },
  put: async (url, data) => {
    const response = await fetch(`${API_ROOT}${url}`, options('PUT', data))
    return await handleResponse(response);
  },
  delete: async (url) => {
    const response = await fetch(`${API_ROOT}${url}`, options('DELETE'))
    return await handleResponse(response);
  }
}

const handleResponse = async (response) => {
  const data = await response.json();
  if (response.status >= 200 && response.status <= 299) {
    return data
  } else {
    console.error(response.status, response.statusText, ': ' + data.detail);
    return { error: data.detail }
  }
}

const auth = {
  github: async (code) => {
    let url = `/users/social-signup`;
    url += '?provider=github';
    url += `&code=${code}`;
    return await requests.get(url);
  },
  google: async (access_token) => {
    let url = `/users/social-signup`;
    url += '?provider=google';
    url += `&access_token=${access_token}`;
    return await requests.get(url);
  },
  socialLogin: async (provider, key) => {
    if (provider === 'github') {
      return await auth.github(key);
    } else {
      return await auth.google(key);
    }
  }
}

const user = {
  getUser: async () => {
    const url = `/user/usename`
    return await requests.get(url)
  },
  getProfile: async (username) => {
    const url = `/profiles/${username}`
    return await requests.get(url)
  }
}

export default {
  auth,
  user,
  setToken: _token => {token = _token}
}