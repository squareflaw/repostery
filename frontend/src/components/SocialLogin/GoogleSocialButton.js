import React from 'react';
import GoogleLogin from 'react-google-login';
import { Button } from 'antd';

const RenderButton = (renderProps) => (
  <Button
    onClick={renderProps.onClick} 
    disabled={renderProps.disabled}
  >
    <img className='logo' src='google.png' alt='google logo'/>
    Sign up with Google
  </Button>
)

const GoogleSocialButton = (props) => {
  const login = (response) => props.login(response.tokenObj.access_token);
  const googleFail = () => console.error('Google auth failed')
  
  return (
    <GoogleLogin
      clientId="905952200671-bfjg0du0acnp7qpngvn6s6l7ajnrjf6t.apps.googleusercontent.com"
      render={RenderButton}
      onSuccess={login}
      onFailure={googleFail}
      cookiePolicy={'single_host_origin'}
    />
  )
};

export default GoogleSocialButton;