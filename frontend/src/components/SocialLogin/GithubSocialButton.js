import React, { useEffect } from 'react'
import { requestGithubAuthentication } from "../../helpers/oauth";
import { Button } from 'antd';

const GithubSocialButton = (props) => {

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code')
    if (code) {
      const cleanURL = window.location.href.split("?")[0];
      window.history.pushState('object', document.title, cleanURL);
      props.login(code)
    }
  }, [])

  return (
    <Button onClick={requestGithubAuthentication}>
      <img className='logo' src='github.png' alt='github logo' />
      Sign up with Github
    </Button>
  );
}

export default GithubSocialButton;