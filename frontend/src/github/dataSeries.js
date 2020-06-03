
/* 
  Main Function to produce and export the data set used in the Dashboard
*/
export const getDashboardDataset = (repos) => {
  return {
    languagesDonut: getReposCountByLanguages(repos),
    timelineData: getTimelineDataSet(repos),
  }
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

const getTimelineDataSet = (repos, order='created_at') => {
  const dataset = repos.map(repo => {
    return {
      name: repo.name,
      data: [{
        x: repo.language,
        y: [
          new Date(repo[order]).getTime(),
          Date.now()
        ],
      }]
    }
  })
  return dataset
}