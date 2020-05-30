import React, { useGlobal, useEffect, useState } from 'reactn';
import styled from "styled-components";
import { Spin } from 'antd';
import SocialLogin from "./SocialLogin/SocialLogin";
import Home from "./Home";
import api from '../api'

const Spinner = styled(Spin)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  const [user, setUser] = useGlobal('user');
  const [error, setError] = useGlobal('responseError')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getUser () {
      const token = window.localStorage.getItem('jwt');
      if (!token) return;

      api.setToken(token);
      setLoading(true);
      let data = await api.user.getUser();
      setLoading(false);
  
      if (data.error) {
        setError(data.error);
      } else {
        setUser({ ...data });
      }
    }
    getUser();
  }, []);

  if (loading) return <Spinner size="large" />
  if (user) return <Home/>
  return <SocialLogin/>
}

export default App;
