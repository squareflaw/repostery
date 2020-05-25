from django.contrib.auth.hashers import check_password
import pytest
import factory
from .factories import UserFactory
from ..serializers import (
    RegistrationSerializer,
    LoginSerializer,
    SocialSerializer,
    UserSerializer
)
from ..oauth import OauthTokenConverter
from ..models import User

# registration serializer

def test_RegistrationSerializer_with_empty_data():
    data = {"wrong": "data"}
    serializer = RegistrationSerializer(data=data)
    assert serializer.is_valid() is False

@pytest.mark.django_db
def test_RegistrationSerializer_with_valid_data():
    user_data = factory.build(dict, FACTORY_CLASS=UserFactory)
    serializer = RegistrationSerializer(data=user_data)
    assert serializer.is_valid()

@pytest.mark.django_db
def test_RegistrationSerializer_hashes_password():
    user_data = factory.build(dict, FACTORY_CLASS=UserFactory)
    serializer = RegistrationSerializer(data=user_data)
    serializer.is_valid()

    user = serializer.save()
    assert check_password(user_data.get('password'), user.password)

# Login serializer

def test_LoginSerializer_with_empty_data():
    data = {"wrong": "data"}
    serializer = LoginSerializer(data=data)
    assert serializer.is_valid() is False

@pytest.mark.django_db
def test_LoginSerializer_with_valid_data():
    user_data = {
        'username': 'user_name',
        'email': 'email@email.com',
        'password': 'secretpass'
    }
    User.objects.create_user(**user_data)
    serializer_data = {
        'email': user_data['email'],
        'password': user_data['password']
    }
    serializer = LoginSerializer(data=serializer_data)
    assert serializer.is_valid(raise_exception=True)
    assert serializer.data.get('token')

# social serializer

@pytest.mark.django_db
def test_SocialSerializer_with_valid_data_google_signup(mocker):
    data = {
        'provider': 'google',
        'access_token': 'fake_token'
    }

    mock_oauth_response = {
        'email': 'test@mail.com',
        'username': 'test_user',
        'password': 'secretpass',
        'image': 'https://lh3.googleusercontent.com/a-/AOh14GhKFe1wz8TsXyJ50Zhr9GOoSd_GBSx4hUeGfnuHuw',
    }

    # fake google response to isolate test from network
    mocker.patch.object(
        OauthTokenConverter,
        'get_user_social_info',
        return_value=mock_oauth_response
    )
    serializer = SocialSerializer(data=data)
    assert serializer.is_valid()
    assert serializer.data.get('token')

def test_SocialSerializer_with_missing_data():
    data = {"wrong": "data"}
    serializer = SocialSerializer(data=data)
    assert serializer.is_valid() is False

@pytest.mark.django_db
def test_SocialSerializer_with_valid_data_github_signup(mocker):
    data = {
        'provider': 'github',
        'code': 'fake_code'
    }

    mock_oauth_response = {
        'email': 'test@mail.com',
        'username': 'test_user',
        'password': 'secretpass',
        'image': 'https://lh3.googleusercontent.com/a-/AOh14GhKFe1wz8TsXyJ50Zhr9GOoSd_GBSx4hUeGfnuHuw',
    }

    # fake google response to isolate test from network
    mocker.patch.object(
        OauthTokenConverter,
        'get_user_social_info',
        return_value=mock_oauth_response
    )
    serializer = SocialSerializer(data=data)
    assert serializer.is_valid()
    assert serializer.data.get('token')

@pytest.mark.django_db
def test_SocialSerializer_with_valid_data_github_signup_with_access_token(mocker):
    data = {
        'provider': 'github',
        'access_token': 'fake_access_token'
    }

    mock_oauth_response = {
        'email': 'test@mail.com',
        'username': 'test_user',
        'password': 'secretpass',
        'image': 'https://lh3.googleusercontent.com/a-/AOh14GhKFe1wz8TsXyJ50Zhr9GOoSd_GBSx4hUeGfnuHuw',
    }

    # fake google response to isolate test from network
    mocker.patch.object(
        OauthTokenConverter,
        'get_user_social_info',
        return_value=mock_oauth_response
    )
    serializer = SocialSerializer(data=data)
    assert serializer.is_valid()
    assert serializer.data.get('token')

def test_SocialSerializer_with_github_missing_token_and_code():
    data = {"provider": "github"}
    serializer = SocialSerializer(data=data)
    assert serializer.is_valid() is False

# UserSerializer

@pytest.mark.django_db
def test_UserSerializer_updates_password():
    user_data = {
        'username': 'user_name',
        'email': 'email@email.com',
        'password': 'secretpass'
    }
    user = User.objects.create_user(**user_data)
    new_data = {'password': 'newpassword'}
    context = {'profile': {'image': None}}
    serializer = UserSerializer(
        user,
        data=new_data,
        context=context,
        partial=True
    )
    assert serializer.is_valid(raise_exception=True)
    serializer.save()
    assert check_password(new_data['password'], User.objects.get(pk=user.pk).password)
