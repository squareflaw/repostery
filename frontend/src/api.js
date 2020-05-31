import {isLocalhost} from './serviceWorker'

const API_ROOT = isLocalhost ? 'http://localhost:8000/api/v1' : 'https://repostery.herokuapp.com/api/v1'
const NETWORK_ERROR = 'Connection with server is unavailable, Try again later';
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
  body: method === 'GET' ? null : JSON.stringify(data)
})

const requests = {
  get: async (url) => {
    try {
      const response = await fetchWithTimeout(`${API_ROOT}${url}`, options());
      return handleResponse(response);
    } catch (error) {
      return { error: NETWORK_ERROR}
    }
  },
  post: async (url, data) => {
    try {
      const response = await fetchWithTimeout(`${API_ROOT}${url}`, options('POST', data))
      return handleResponse(response);
    } catch (error) {
      return { error: NETWORK_ERROR }
    }
  },
  put: async (url, data) => {
    try {
      const response = await fetchWithTimeout(`${API_ROOT}${url}`, options('PUT', data))
      return handleResponse(response);
    } catch (error) {
      return { error: NETWORK_ERROR}
    }
  },
  delete: async (url) => {
    try {
      const response = await fetchWithTimeout(`${API_ROOT}${url}`, options('DELETE'))
      return handleResponse(response);
    } catch (error) {
      return { error: NETWORK_ERROR }
    }
  }
}

const fetchWithTimeout = (url, options, timeout = 15000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), timeout)
    )
  ]);
}

const handleResponse = (response) => {
  const data = response.json();
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