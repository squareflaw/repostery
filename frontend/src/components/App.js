import React, { useGlobal, useEffect } from 'reactn';
import SocialLogin from "./SocialLogin/SocialLogin";
import Home from "./Home";

const App = () => {
  const [user] = useGlobal('user');
  const [height, setHeight] = useGlobal('height')
  const [width, setWidth] = useGlobal('width');

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });

  if (user) return <Home/>
  return <SocialLogin/>
}

export default App;
