import {isLocalhost} from './serviceWorker'

const API_ROOT = isLocalhost ? 'http://localhost:8000/api/v1' : 'https://repostery.herokuapp.com/api/v1'
let token = null;

const requests = {
  get: async (url) => {
    const response = await fetch(`${API_ROOT}${url}`);
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

export default {
  auth,
  setToken: _token => {token = _token}
}