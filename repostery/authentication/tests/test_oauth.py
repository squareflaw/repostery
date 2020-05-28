import pytest
from rest_framework.exceptions import AuthenticationFailed
from ..oauth import OauthTokenConverter
from .mocks import MockResponse

class TestGoogleTokenConverter:
    """
    Test cases for getting user info with google access token
    """

    def test_should_get_info_with_valid_access_token(self, mocker):
        fake_google_response_data = {
            "sub": "106623665108941395637",
            "name": "Albin Garcia",
            "given_name": "Albin",
            "family_name": "Garcia",
            "picture": "https://lh3.googleusercontent.com/a-/AOh14GhKFe1wz8TsXyJ50Zhr9GOoSd_GBSx4hUeGfnuHuw",
            "email": "squareflaw@gmail.com",
            "email_verified": True,
            "locale": "es"
        }
        mock_response = MockResponse(fake_google_response_data)
        mocker.patch('requests.get', return_value=mock_response)
        token_converter = OauthTokenConverter()
        results = token_converter.get_user_social_info(
            provider='google',
            access_token='valid_access_token'
        )
        assert results['email'] == fake_google_response_data['email']
        assert results['image'] == fake_google_response_data['picture']

    def test_should_raise_authentication_error_invalid_token(self, mocker):
        mock_response = MockResponse(None, error=True)  # raises HTTPError
        mocker.patch('requests.get', return_value=mock_response)
        token_converter = OauthTokenConverter()
        with pytest.raises(AuthenticationFailed):
            token_converter.get_user_social_info(
                provider='google',
                access_token='expired_token'
            )

class TestGithubTokenConverter:
    """
    Test cases for getting user info with github code and access token
    """

    def test_should_get_info_with_valid_code(self, mocker):
        fake_github_response_data = {
            "login": "squareflaw",
            "id": 39705088,
            "node_id": "MDQ6VXNlcjM5NzA1MDg4",
            "avatar_url": "https://avatars0.githubusercontent.com/u/39705088?v=4",
            "gravatar_id": "", "url": "https://api.github.com/users/squareflaw",
            "html_url": "https://github.com/squareflaw",
            "followers_url": "https://api.github.com/users/squareflaw/followers",
            "following_url": "https://api.github.com/users/squareflaw/following{/other_user}",
            "gists_url": "https://api.github.com/users/squareflaw/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/squareflaw/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/squareflaw/subscriptions",
            "organizations_url": "https://api.github.com/users/squareflaw/orgs",
            "repos_url": "https://api.github.com/users/squareflaw/repos",
            "events_url": "https://api.github.com/users/squareflaw/events{/privacy}",
            "received_events_url": "https://api.github.com/users/squareflaw/received_events",
            "type": "User",
            "site_admin": False,
            "name": "Albin Garcia",
            "company": None,
            "blog": "",
            "location": None,
            "email": None,
            "hireable": None,
            "bio": "Electronics Engineer and web developer using react js and django",
            "public_repos": 5,
            "public_gists": 0,
            "followers": 0,
            "following": 0,
            "created_at": "2018-05-28T15:36:21Z",
            "updated_at": "2020-05-27T13:58:02Z"
        }
        fake_email_response_data = [
            {
                "email": "squareflaw@gmail.com",
                "primary": True,
                "verified": True,
                "visibility": "private"
            }
        ]
        mocker.patch('requests.get', side_effect=[
            # 1st: request valid access_token using code param
            MockResponse({"access_token": 'Valid_access_token'}),
            MockResponse(fake_github_response_data),  # 2nd: request user info using the access_token
            MockResponse(fake_email_response_data)  # 3rd: request user private email address
        ])
        token_converter = OauthTokenConverter()
        results = token_converter.get_user_social_info(
            provider='github',
            code='valid_code'
        )
        assert results['email'] == fake_email_response_data[0]['email']
        assert results['image'] == fake_github_response_data['avatar_url']

    def test_should_get_info_with_valid_access_token(self, mocker):
        fake_github_response_data = {
            "login": "squareflaw",
            "id": 39705088,
            "node_id": "MDQ6VXNlcjM5NzA1MDg4",
            "avatar_url": "https://avatars0.githubusercontent.com/u/39705088?v=4",
            "gravatar_id": "", "url": "https://api.github.com/users/squareflaw",
            "html_url": "https://github.com/squareflaw",
            "followers_url": "https://api.github.com/users/squareflaw/followers",
            "following_url": "https://api.github.com/users/squareflaw/following{/other_user}",
            "gists_url": "https://api.github.com/users/squareflaw/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/squareflaw/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/squareflaw/subscriptions",
            "organizations_url": "https://api.github.com/users/squareflaw/orgs",
            "repos_url": "https://api.github.com/users/squareflaw/repos",
            "events_url": "https://api.github.com/users/squareflaw/events{/privacy}",
            "received_events_url": "https://api.github.com/users/squareflaw/received_events",
            "type": "User",
            "site_admin": False,
            "name": "Albin Garcia",
            "company": None,
            "blog": "",
            "location": None,
            "email": None,
            "hireable": None,
            "bio": "Electronics Engineer and web developer using react js and django",
            "public_repos": 5,
            "public_gists": 0,
            "followers": 0,
            "following": 0,
            "created_at": "2018-05-28T15:36:21Z",
            "updated_at": "2020-05-27T13:58:02Z"
        }
        fake_email_response_data = [
            {
                "email": "squareflaw@gmail.com",
                "primary": True,
                "verified": True,
                "visibility": "private"
            }
        ]
        mocker.patch('requests.get', side_effect=[
            MockResponse(fake_github_response_data),  # 1st: request user info using the access_token
            MockResponse(fake_email_response_data)  # 2nd: request user private email address
        ])
        token_converter = OauthTokenConverter()
        results = token_converter.get_user_social_info(
            provider='github',
            access_token='valid_access_token'
        )
        assert results['email'] == fake_email_response_data[0]['email']
        assert results['image'] == fake_github_response_data['avatar_url']

    def test_should_raise_authentication_error_invalid_code(self, mocker):
        mock_response = MockResponse(None, error=True)  # raises HTTPError
        mocker.patch('requests.get', return_value=mock_response)
        token_converter = OauthTokenConverter()
        with pytest.raises(AuthenticationFailed):
            token_converter.get_user_social_info(
                provider='github',
                code='expired_code'
            )

    def test_should_raise_authentication_error_invalid_access_token(self, mocker):
        mock_response = MockResponse(None, error=True)  # raises HTTPError
        mocker.patch('requests.get', return_value=mock_response)
        token_converter = OauthTokenConverter()
        with pytest.raises(AuthenticationFailed):
            token_converter.get_user_social_info(
                provider='github',
                access_token='expired_access_token'
            )
