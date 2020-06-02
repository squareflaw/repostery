import React, { useGlobal, useEffect, useState } from 'reactn';
import Home from "./Home";
import api from '../api'
import Spinner from './Spinner';
import Landing from './Landing/Landing';

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

    async function getUser() {
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

  if (loading) return <Spinner fullHeight/>
  return <Home/>
}

export default App;
