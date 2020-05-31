import requests
from decouple import config
from rest_framework.exceptions import AuthenticationFailed

class OauthTokenConverter:
    """
    Object for requesting user social information using an access_token,
    we make it a class to be able to mock it in tests easier
    """

    def get_user_social_info(self, provider, access_token=None, code=None):
        if provider == 'github':
            return self.get_github_user_info(access_token=access_token, code=code)
        return self.get_google_user_info(access_token)

    def get_google_user_info(self, access_token):
        url = f'https://www.googleapis.com/oauth2/v3/userinfo?access_token={access_token}'
        try:
            response = requests.get(url)
            response.raise_for_status()
        except requests.exceptions.HTTPError:
            raise AuthenticationFailed('google access token is invalid or has expired')

        data = response.json()
        user_info = {
            'email': data.get('email'),
            'username': f'{data.get("email")[:-10]}-g',
            'image': data.get('picture'),
        }
        return user_info

    def get_github_user_info(self, access_token=None, code=None):
        if not access_token:
            access_token = self._get_github_access_token(code)

        url = 'https://api.github.com/user'
        url_for_email = 'https://api.github.com/user/emails'
        headers = {'Authorization': f'bearer {access_token}'}

        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            email_response = requests.get(url_for_email, headers=headers)
            email_response.raise_for_status()
        except requests.exceptions.HTTPError:
            raise AuthenticationFailed('github access token is invalid or has expired')

        data = response.json()
        email = email_response.json()[0].get('email')
        user_info = {
            'email': email,
            'username': data.get('login'),
            'image': data.get('avatar_url'),
        }
        return user_info

    def _get_github_access_token(self, code):
        GITHUB_CLIENT_ID = config('GITHUB_CLIENT_ID')
        GITHUB_CLIENT_SECRET = config('GITHUB_CLIENT_SECRET')

        url = 'https://github.com/login/oauth/access_token'
        url += f'?client_id={GITHUB_CLIENT_ID}'
        url += f'&client_secret={GITHUB_CLIENT_SECRET}'
        url += f'&code={code}'

        try:
            response = requests.get(url, headers={"Accept": "application/json"})
            response.raise_for_status()
        except requests.exceptions.HTTPError:
            raise AuthenticationFailed('github code is invalid or has expired')
        response = response.json()
        return response.get('access_token')


if __name__ == '__main__':
    oauth = OauthTokenConverter()
    info = oauth.get_user_social_info(
        provider='github',
        code='62d3c33477aebafe7dfa'
    )
    print(info)
