import { isLocalhost } from '../serviceWorker'

export const requestGithubAuthentication = () => {
    const client_id = 'eb01be873c47acc78a04';
    const redirect_uri = isLocalhost ? 'http://localhost:3000' : 'https://reposterychart.firebaseapp.com';
    let url = `https://github.com/login/oauth/authorize?client_id=${client_id}`;
    url += `&redirect_uri=${redirect_uri}`;
    url += `&scope=user:email`;
    window.location.href = url;
}