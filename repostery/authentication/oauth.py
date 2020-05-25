import requests
from rest_framework.exceptions import NotFound

class OauthTokenConverter:
    """
    Object for requesting user social information using an access_token,
    we make it a class instead of a simple function to be able to mock it in tests easier
    """

    def get_user_social_info(self, provider, access_token):
        url = f'https://www.googleapis.com/oauth2/v3/userinfo?access_token={access_token}'
        google_response = requests.get(url)

        if google_response.status_code >= 400:
            raise NotFound('access token is invalid or has expired')

        user_info = {
            'email': google_response.json()['email'],
            'username': google_response.json()['email'],
            'password': google_response.json()['sub'],
            'image': google_response.json().get('picture'),
        }
        return user_info
