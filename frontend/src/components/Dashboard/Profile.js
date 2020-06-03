import React from 'reactn';
import styled from "styled-components";
import { Tooltip } from 'antd';
import Stat from './Stats'

const MainDiv = styled.div`
  width: 100vw;
  max-width: 1000px;
  padding: 20px;
  padding-bottom: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
`;

const Avatar = styled.a`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: var(--full-black);
  cursor: pointer;

  @media (max-width: 700px) { 
    width: 100%;
  }

  :hover {
    color: var(--full-black);
  }

  img {
    width: 200px;
    border-radius: 3px;
    box-shadow: 3px 3px 3px #888;
    margin-bottom: 20px;
  }
`;

const Profile = ({profile, starsCount}) => {
  return (
    <MainDiv>
      <Tooltip title='Open Github profile'>
        <Avatar href={profile.html_url}>
          <img src={profile.avatar_url} alt='profile picture'/>
          <p>{profile.login}</p>
        </Avatar>
      </Tooltip>
      <Stat title="On Github since 🌟" value={profile.created_at.slice(0,4)} />
      <Stat title="Public Repositories 📚" value={profile.public_repos} />
    </MainDiv>
  )
}

export default Profile;