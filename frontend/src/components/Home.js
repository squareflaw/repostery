import React, { useGlobal} from 'reactn';
import Nav from "./Nav";
import api from '../api'

export const Home = () => {
  const [user, setUser] = useGlobal('user');

  const handleLogout = () => {
    api.setToken(null);
    window.localStorage.setItem('jwt', '');
    setUser(null);
  }

  return (
    <div>
      <Nav user={user} logout={handleLogout}/>
    </div>
  )
}

export default Home;