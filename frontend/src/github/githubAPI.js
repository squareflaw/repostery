
const API_ROOT = 'https://api.github.com/';
let access_token = window.localStorage.getItem('gh_access_token');

export const setGithubAccessToken = _token => { access_token = _token };

const options = () => ({
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Repostery',
    'Authorization': access_token ? `token ${access_token}` : ''
  }
})

export const getUser = async (username) => {
  const response = await fetch(`${API_ROOT}users/${username}`, options());
  let user = await response.json();
  if (user.message) return null;
  return user;
}

export const getStarredReposByUser = async (username) => {
  const response = await fetch(`${API_ROOT}users/${username}/starred`, options());
  let repos = await response.json();
  if (repos.message) return [];
  return repos;
}

export const getUsernameSuggestions = async (query) => {
  const response = await fetch(`https://api.github.com/search/users?q=${query}`, options());
  const results = await response.json();
  if (!results.items) return [];
  const suggestions = results.items.map(user => ({value: user.login}));
  return suggestions;
}

export default {
  getUser,
  getStarredReposByUser,
  getUsernameSuggestions
}