import requests
from decouple import config
from rest_framework.exceptions import AuthenticationFailed

class OauthTokenConverter:
    """
    Object for requesting user social information using an access_token,
    we make it a class to be able to mock it in tests easier
    """

    def get_user_social_info(self, provider, access_token, code=None):
        if provider == 'github':
            return self._get_github_user_info(access_token=access_token, code=code)
        return self._get_google_user_info(access_token)

    def _get_google_user_info(self, access_token):
        url = f'https://www.googleapis.com/oauth2/v3/userinfo?access_token={access_token}'
        response = requests.get(url)

        if response.status_code >= 400:
            raise AuthenticationFailed('google access token is invalid or has expired')

        data = response.json()
        user_info = {
            'email': data['email'],
            'username': data['email'],
            'image': data.get('picture'),
        }
        return user_info

    def _get_github_user_info(self, *args, access_token=None, code=None):
        if not access_token:
            access_token = self._get_github_access_token(code)

        url = 'https://api.github.com/user'
        headers = {
            'Authorization': f'bearer {access_token}'
        }

        response = requests.get(url, headers=headers)
        if response.status_code >= 400:
            raise AuthenticationFailed('github access token is invalid or has expired')

        email = self._get_email_from_github(response)
        data = response.json()
        user_info = {
            'email': email,
            'username': data['login'],
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
        response = requests.post(url, headers={"Accept": "application/json"})

        if response.status_code >= 400:
            raise AuthenticationFailed('github code is invalid or has expired')

        response = response.json()
        return response.get('access_token')

    def _get_email_from_github(self, response):
        # fake email but can be use to query user when authenticating
        fallback_email = response.json()['login'] + '@github.com'
        if not response.json().get('email'):
            email = fallback_email
        else:
            email = response.json().get('email')
        return email

# if __name__ == '__main__':
#     oauth = OauthTokenConverter()
#     info = oauth.get_user_social_info(provider='google', access_token='invalid')
#     print(info)
