import React, { useState, useEffect, useGlobal } from 'reactn';
import styled from 'styled-components'
import { Card } from 'antd';
import Spinner from '../Spinner'
import { getStarredReposByUser } from '../../helpers/githubAPI'
import { range } from '../../helpers/utils'
import LineBarChart from '../Charts/LineBarChart';

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
`;

const Grid = styled.div`
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  justify-content: center;
  justify-items: stretch;
  align-items: baseline;
  grid-gap: 20px;
`;


const RepoCard = ({ repo }) => (
  <Card title={repo.name} bordered={false} >
    <p>{repo.description}</p>
    <p>{repo.stargazers_count}</p>
    <p>{repo.language}</p>
  </Card>
);

const TopRepositories = () => {
  const [searchInput] = useGlobal('searchInput')
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const repoItems = repos.map(repo => <RepoCard key={repo.name} repo={repo}/>)

  useEffect(() => {
    async function fetchRepos() {
      setLoading(true);
      const repos = await getStarredReposByUser(searchInput);
      setRepos(repos);
      setLoading(false);
    }
    if (searchInput) fetchRepos();
  }, [searchInput, setRepos])


  if (loading) {
    return (
      <Grid>
        <Card style={{ width: 300, marginTop: 16 }} loading={loading}></Card>
        <Card style={{ width: 300, marginTop: 16 }} loading={loading}></Card>
        <Card style={{ width: 300, marginTop: 16 }} loading={loading}></Card>
        <Card style={{ width: 300, marginTop: 16 }} loading={loading}></Card>
        <Card style={{ width: 300, marginTop: 16 }} loading={loading}></Card>
        <Card style={{ width: 300, marginTop: 16 }} loading={loading}></Card>
      </Grid>
    )
  } else {
    return (
      <MainDiv>
        <Grid>
          {repoItems}
        </Grid>
        <LineBarChart type='bar'/>
        <LineBarChart/>
      </MainDiv>
    )
  }
}

export default TopRepositories;