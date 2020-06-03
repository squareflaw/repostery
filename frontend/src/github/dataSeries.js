
/* 
  Main Function to produce and export the data set used in the Dashboard
*/
export const getDashboardDataset = (repos) => {
  return {
    reposForBars: formatReposForXY(repos, 'name', 'open_issues_count'),
    languagesDonut: getReposCountByLanguages(repos)
  }
}

const orderRepos = (repos, field = 'stargazers_count') => {
  const orderedRepos = repos.sort((a, b) => {
    if (a[field] > b[field]) return -1;
    if (a[field] < b[field]) return 1;
    return 0;
  })
  return orderedRepos;
}

const formatReposForXY = (repos, xField = 'name', yField ='stargazers_count') => {
  const dataSet = repos.map(repo => ({
    ...repo,
    x: repo[xField],
    y: repo[yField]
  }))
  return dataSet;
}

const getReposCountByLanguages = (repos) => {
  let countByLanguage = {};
  repos.forEach((repo) => {
    if (!repo.language) repo.language = 'Others';
    if (repo.language in countByLanguage) {
      countByLanguage[repo.language] += 1;
    } else {
      countByLanguage[repo.language] = 1;
    }
  });
  const languages = Object.keys(countByLanguage);
  const reposCount = languages.map(language => countByLanguage[language]);
  return {
    series: reposCount,
    labels: languages
  }
}