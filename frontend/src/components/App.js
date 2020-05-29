import React from 'react';
import { GoogleLogin } from 'react-google-login';
import GithubSocialButton from './GithubSocialButton'

const App = () => {

  const handleResponse = (response) => {
    console.log(response)
  }

  return (
    <div className="App">
      <GoogleLogin
        clientId="905952200671-5m0b8f3ku2h032mo0dpfsfnidt2ocnr7.apps.googleusercontent.com"
        buttonText="Google Signup"
        onSuccess={handleResponse}
        onFailure={handleResponse}
        cookiePolicy={'single_host_origin'}
      />
        <GithubSocialButton/>
    </div>
  );
}

export default App;
