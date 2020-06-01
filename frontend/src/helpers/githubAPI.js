import { requests } from "../api";

const options = (method = 'GET') => ({
  method: method,
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Repostery'
  },
  referrerPolicy: 'no-referrer'
})

export const getStarredReposByUser = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}/starred`);
  let repos = await response.json()
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
  return repos
}

export const getUsernameSuggestions = async (query) => {
  const response = await fetch(`https://api.github.com/search/users?q=${query}`, options());
  const results = await response.json()
  const suggestions = results.items.map(user => ({value: user.login}))
  return suggestions
}