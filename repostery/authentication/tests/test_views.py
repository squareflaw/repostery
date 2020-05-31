from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
import pytest
import json
from ..oauth import OauthTokenConverter
from .factories import UserFactory
from .mocks import MockResponse

class TestRegistrationViewSet:
    """
    Test cases for the register endpoint
    """

    @pytest.mark.django_db
    def test_register_user_success(self, client):
        url = reverse('registration-list')
        data = {
            "user": {
                'username': 'user1',
                'email': "email@cookie.com",
                'password': 'user1pass'
            }
        }
        response = client.post(url, data=data, content_type='application/json')
        assert response.status_code == status.HTTP_201_CREATED
        assert json.loads(response.content).get('username') == data['user']['username']

    @pytest.mark.django_db
    def test_register_user_fails(self, client):
        url = reverse('registration-list')
        data = {
            "user": {
                'username': 'user1',
                'email': "invalid_email",
                'password': 'user1pass'
            }
        }
        response = client.post(url, data=data, content_type='application/json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST


class TestLoginViewSet:
    """
    Test cases for the login endpoint
    """

    @pytest.mark.django_db
    def test_login_user_success(self, client):
        url = reverse('login-list')
        data = {
            "user": {
                'username': 'user1',
                'email': "email@cookie.com",
                'password': 'user1pass'
            }
        }
        User = get_user_model()
        User.objects.create_user(**data['user'])
        response = client.post(url, data=data, content_type='application/json')
        assert response.status_code == status.HTTP_200_OK
        assert json.loads(response.content).get('username') == data['user']['username']

    @pytest.mark.django_db
    def test_login_user_fails(self, client):
        url = reverse('login-list')
        data = {
            "user": {
                'username': 'unregisterd_user',
                'email': "invalid_email",
                'password': 'user1pass'
            }
        }
        response = client.post(url, data=data, content_type='application/json')
        assert response.status_code == status.HTTP_404_NOT_FOUND


class TestGoogleSocialRegistration:
    """
    Test cases for authenticating with google
    """

    @pytest.mark.django_db
    def test_google_signup_success(self, client, mocker):
        url = reverse('social-signup-list')
        url += '?provider=google'
        url += '&access_token=fake_token'

        mock_oauth_response = {
            'email': 'test@mail.com',
            'username': 'test_user',
            'image': 'https://lh3.googleusercontent.com/a-/AOh14GhKFe1wz8TsXyJ50Zhr9GOoSd_GBSx4hUeGfnuHuw',
        }

        # fake google response to isolate test from network
        mocker.patch.object(
            OauthTokenConverter,
            'get_user_social_info',
            return_value=mock_oauth_response
        )

        response = client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert json.loads(response.content).get('token')

    @pytest.mark.django_db
    def test_google_signup_fails(self, client, mocker):
        url = reverse('social-signup-list')
        url += '?provider=google'
        url += '&access_token=invalid_token'

        mock_response = MockResponse(None, error=True)  # raises HTTPError
        mocker.patch('requests.get', return_value=mock_response)
        response = client.get(url)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED


class TestGithubSocialRegistration:
    """
    Test cases for authenticating with github
    """
    @pytest.mark.django_db
    def test_github_signup_success(self, client, mocker):
        url = reverse('social-signup-list')
        url += '?provider=github'
        url += '&code=fake_code'

        mock_oauth_response = {
            'email': 'test@mail.com',
            'username': 'test_user',
            'image': 'https://lh3.googleusercontent.com/a-/AOh14GhKFe1wz8TsXyJ50Zhr9GOoSd_GBSx4hUeGfnuHuw',
        }

        # fake google response to isolate test from network
        mocker.patch.object(
            OauthTokenConverter,
            'get_user_social_info',
            return_value=mock_oauth_response
        )

        response = client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert json.loads(response.content).get('token')

    @pytest.mark.django_db
    def test_github_signup_fails(self, client, mocker):
        url = reverse('social-signup-list')
        url += '?provider=github'
        url += '&code=invalid_code'
        mock_response = MockResponse(None, error=True)  # raises HTTPError
        mocker.patch('requests.get', return_value=mock_response)
        response = client.get(url)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED


class TestUserRetrieveViewSet:
    """
    Test cases for retrieving user info
    """

    @pytest.mark.django_db
    def test_user_retrive_success(self, client):
        user = UserFactory()
        url = reverse('user-detail', kwargs={'username': user.username})
        response = client.get(
            url,
            HTTP_AUTHORIZATION=f'Token {user.token}'
        )
        assert response.status_code == status.HTTP_200_OK
        assert json.loads(response.content).get('username') == user.username

    @pytest.mark.django_db
    def test_user_retrieve_fails_unauthorized(self, client):
        user = UserFactory()
        url = reverse('user-detail', kwargs={'username': user.username})
        response = client.get(url, HTTP_AUTHORIZATION='')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED


class TestUserUpdateViewSet:
    """
    Test cases for updating user info
    """

    @pytest.mark.django_db
    def test_user_update_success(self, client):
        user = UserFactory()
        new_data = {'user': {'email': 'new_email@cookie.com'}}
        url = reverse('user-detail', kwargs={'username': user.username})
        response = client.put(
            url,
            data=new_data,
            content_type='application/json',
            HTTP_AUTHORIZATION=f'Token {user.token}'
        )
        User = get_user_model()
        updated_user = User.objects.get(pk=user.pk)
        assert response.status_code == status.HTTP_200_OK
        assert json.loads(response.content).get('email') == updated_user.email

    @pytest.mark.django_db
    def test_user_update_fails_unauthorized(self, client):
        user = UserFactory.create()
        url = reverse('user-detail', kwargs={'username': user.username})
        response = client.put(url, HTTP_AUTHORIZATION='')
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
