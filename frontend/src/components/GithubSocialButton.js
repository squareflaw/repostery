import React from 'react'

class GithubSocialButton extends React.Component {
  state = {
    loggedIn: false
  }

  triggerLogin = () => {
    if(this.state.loggedIn) return;
    const client_id = 'eb01be873c47acc78a04';
    const redirect_uri = 'http://localhost:3000/';
    let url = `https://github.com/login/oauth/authorize?client_id=${client_id}`;
    url += `&redirect_uri=${redirect_uri}`;
    url += `&scope=user:email`;
    window.location.href = url;
  }

  componentDidMount(){
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code')
    console.log(code)
  }

  render() {
    return (
      <button onClick={this.triggerLogin}>
        Sign up with Github
      </button>
    );
  }
}



export default GithubSocialButton;