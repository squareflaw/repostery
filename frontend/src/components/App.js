import React, { useGlobal, useEffect, useState } from 'reactn';
import styled from "styled-components";
import { Spin } from 'antd';
import SocialLogin from "./SocialLogin/SocialLogin";
import Home from "./Home";
import api from '../api'

const Spinner = styled(Spin)`
  min-height: ${window.innerHeight}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  const [user, setUser] = useGlobal('user');
  const [height, setHeight] = useGlobal('height')
  const [width, setWidth] = useGlobal('width');
  const [loading, setLoading] = useState(false)

  // Get user profile if storaged token
  useEffect(() => {
    const token = window.localStorage.getItem('jwt');
    if (!token) return;
    api.setToken(token);
    setLoading(true);

    async function getUser () {
      const data = await api.user.getUser();
      setLoading(false);
  
      if (data.error) return;
      setUser({ ...data });
    }
    getUser();
  }, [setUser]);

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });

  if (loading) return <Spinner size="large" />
  if (user) return <Home/>
  return <SocialLogin/>
}

export default App;
