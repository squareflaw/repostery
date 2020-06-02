export const formatReposForXY = (repos, xField = 'name', yField ='stargazers_count') => {
  const dataSet = repos.map(repo => ({
    ...repo,
    x: repo[xField],
    y: repo[yField]
  }))
  return dataSet;
}


export const orderRepos = (repos, field = 'stargazers_count') => {
  const orderedRepos = repos.sort((a, b) => {
    if (a[field] > b[field]) return -1;
    if (a[field] < b[field]) return 1;
    return 0;
  })
  return orderedRepos;
}