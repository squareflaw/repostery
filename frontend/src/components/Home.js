import React, { useState, useEffect, useGlobal } from 'reactn';
import Spinner from './Spinner'
import Nav from "./Nav/Nav";
import Dashboard from './Dashboard';
import { getStarredReposByUser } from '../github/githubAPI'
import { formatReposForXY } from '../github/dataSeries'
import Landing from './Landing/Landing';
import NotFoundIllustration from './NotFoundIllustration';

export const Home = () => {

  const [searchInput] = useGlobal('searchInput')
  const [user] = useGlobal('user')
  const [dataSet, setDataSet] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchRepos() {
      setLoading(true);
      let repos = await getStarredReposByUser(searchInput);
      repos = formatReposForXY(repos, 'name', 'stargazers_count').slice(0, 10)
      setDataSet(repos);
      setLoading(false);
    }
    if (searchInput) fetchRepos();
  }, [searchInput])

  if (loading) {
    return (
      <>
        <Nav/>
        <Spinner/>
      </>
    )
  } else if (searchInput && dataSet.length > 0) {
    return (
      <>
        <Nav />
        <Dashboard dataSet={dataSet} />
      </>
    )
  }else if (user) {
    return (
      <>
        <Nav />
        <NotFoundIllustration />
      </>
    )
  } else {
    return (
      <>
        <Nav />
        <Landing />
      </>
    )
  }
}

export default Home;