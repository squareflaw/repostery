import React, { useEffect, useGlobal } from 'reactn'
import { requestGithubAuthentication } from "../../github/oauth";
import { Button } from 'antd';
import { showGithubLoginConfirm } from '../Modals';

const GithubSocialButton = (props) => {
  const [width] = useGlobal('width');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code')
    if (code) {
      const cleanURL = window.location.href.split("?")[0];
      window.history.pushState('object', document.title, cleanURL);
      props.login(code)
    }
  }, [props])

  return (
    <Button 
      onClick={width > 700 ? requestGithubAuthentication : () => showGithubLoginConfirm(requestGithubAuthentication)
    }>
      <img className='logo' src='github.png' alt='github logo' />
      {width > 700 && "Sign up with Github"}
    </Button>
  );
}

export default GithubSocialButton;