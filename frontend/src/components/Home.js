import React from 'reactn';
import Nav from "./Nav/Nav";
// import Tabs from './Tabs'
import TopRepositories from './Repositories/TopRepositories';

export const Home = () => {

  return (
    <div>
      <Nav />
      <TopRepositories />
    </div>
  )
}

export default Home;