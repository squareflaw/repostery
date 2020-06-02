
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

export const getStarredReposByUser = async (username) => {
  const response = await fetch(`${API_ROOT}users/${username}/starred`, options());
  let repos = await response.json();
  if (repos.message) return [];
  repos = repos.map(repo => ({
    name: repo.name,
    full_name: repo.full_name,
    html_url: repo.html_url,
    description: repo.description,
    created_at: repo.created_at,
    updated_at: repo.updated_at,
    size: repo.size,
    language: repo.language,
    owner_avatar_url: repo.owner.avatar_url,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    open_issues_count: repo.open_issues_count,
    contributors_url: repo.contributors_url
  }))
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
  getStarredReposByUser
}