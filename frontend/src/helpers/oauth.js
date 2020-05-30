export const requestGithubAuthentication = () => {
    const client_id = 'eb01be873c47acc78a04';
    const redirect_uri = 'http://localhost:3000/';
    let url = `https://github.com/login/oauth/authorize?client_id=${client_id}`;
    url += `&redirect_uri=${redirect_uri}`;
    url += `&scope=user:email`;
    window.location.href = url;
}