import pytest
import jwt

from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed

from ..backends import JWTAuthentication
from ..models import User
from .factories import UserFactory

class MockHttpRequest():
    """
    Mock class for Django's HttpRequest objects
    """
    def __init__(self):
        self.META = {}

    def set_auth(self, token):
        self.META['HTTP_AUTHORIZATION'] = 'Token ' + token


class TestJWTAuthentication:
    """
    Test cases for authenticating a token with our custom jwt authentication system
    """

    def test_should_return_user_from_token(self, mocker):
        user = UserFactory.build()
        request = MockHttpRequest()
        request.set_auth(user.token)
        mocker.patch.object(User.objects, 'get', return_value=user)  # prevent hitting the db
        (result_user, token) = JWTAuthentication().authenticate(request)
        assert user.username == result_user.username

    def test_should_return_error_user_is_deactivated(self, mocker):
        user = UserFactory.build()
        user.is_active = False
        request = MockHttpRequest()
        request.set_auth(user.token)
        mocker.patch.object(User.objects, 'get', return_value=user)
        with pytest.raises(AuthenticationFailed):
            (result_user, token) = JWTAuthentication().authenticate(request)

    def test_should_fail_unregisterd_token(self, mocker):
        token = jwt.encode({
            'id': -1,
            'exp': 10000000000000
        }, settings.SECRET_KEY, algorithm='HS256')
        request = MockHttpRequest()
        request.set_auth(token.decode('utf-8'))
        mocker.patch.object(User.objects, 'get', side_effect=User.DoesNotExist)
        with pytest.raises(AuthenticationFailed):
            (result_user, token) = JWTAuthentication().authenticate(request)

    def test_should_fail_expired_token(self, mocker):
        user = UserFactory.build()
        token = jwt.encode({
            'id': user.id,
            'exp': 10
        }, settings.SECRET_KEY, algorithm='HS256')
        request = MockHttpRequest()
        request.set_auth(token.decode('utf-8'))
        with pytest.raises(AuthenticationFailed):
            (result_user, token) = JWTAuthentication().authenticate(request)
