import React, { useState, useEffect, useGlobal } from 'reactn';
import Spinner from './Spinner'
import Nav from "./Nav/Nav";
import Dashboard from './Dashboard/Dashboard';
import Landing from './Landing/Landing';
import NotFoundIllustration from './NotFoundIllustration';
import githubAPI from '../github/githubAPI'
import { getDashboardDataset } from '../github/dataSeries'

export const Home = () => {
  const [searchInput] = useGlobal('searchInput')
  const [user] = useGlobal('user')
  const [dataSet, setDataSet] = useState(null)
  const [starsCount, setStarsCount] = useState(0)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)

  // Runs on every user search
  useEffect(() => {
    async function fetchDataset() {
      setLoading(true);
      const profile = await githubAPI.getUser(searchInput);
      const repos = await githubAPI.getStarredReposByUser(searchInput);
      if (repos.length < 1) return setLoading(false);
      const dataset = getDashboardDataset(repos);
      setStarsCount(repos.length);
      setDataSet(dataset);
      setProfile(profile);
      setLoading(false);
    }
    if (searchInput) fetchDataset();
  }, [searchInput])

  if (loading) {
    return (
      <>
        <Nav/>
        <Spinner/>
      </>
    )
  } else if (searchInput && dataSet) {
    return (
      <>
        <Nav />
        <Dashboard dataSet={dataSet} profile={profile} starsCount={starsCount}/>
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