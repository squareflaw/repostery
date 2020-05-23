import pytest
import jwt
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed
from .factories import UserFactory
from ..backends import JWTAuthentication

class MockRequest():
    def __init__(self):
        self.META = {}

    def set_auth(self, token):
        self.META['HTTP_AUTHORIZATION'] = 'Token ' + token

@pytest.mark.django_db
def test_should_return_user_info_from_token():
    user = UserFactory()
    request = MockRequest()
    request.set_auth(user.token)
    (result_user, token) = JWTAuthentication().authenticate(request)
    assert user.username == result_user.username

@pytest.mark.django_db
def test_should_return_error_user_is_deactivated():
    user = UserFactory()
    user.is_active = False
    user.save()
    request = MockRequest()
    request.set_auth(user.token)
    with pytest.raises(AuthenticationFailed):
        (result_user, token) = JWTAuthentication().authenticate(request)

@pytest.mark.django_db
def test_should_fail_unregisterd_token():
    token = jwt.encode({
        'id': -1,
        'exp': 10000000000000
    }, settings.SECRET_KEY, algorithm='HS256')
    request = MockRequest()
    request.set_auth(token.decode('utf-8'))
    with pytest.raises(AuthenticationFailed):
        (result_user, token) = JWTAuthentication().authenticate(request)

@pytest.mark.django_db
def test_should_fail_expired_token():
    user = UserFactory()
    token = jwt.encode({
        'id': user.id,
        'exp': 10
    }, settings.SECRET_KEY, algorithm='HS256')
    request = MockRequest()
    request.set_auth(token.decode('utf-8'))
    with pytest.raises(AuthenticationFailed):
        (result_user, token) = JWTAuthentication().authenticate(request)
