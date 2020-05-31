import pytest

from django.contrib.auth.backends import ModelBackend
from django.db.models.fields.related_descriptors import ReverseOneToOneDescriptor
from rest_framework.serializers import ValidationError
from rest_framework.exceptions import NotFound

from repostery.profiles.models import Profile
from repostery.profiles.tests.factories import ProfileFactory
from ..serializers import (
    RegistrationSerializer,
    LoginSerializer,
    SocialSerializer,
    UserSerializer
)
from ..oauth import OauthTokenConverter
from ..models import User
from .factories import UserFactory

class TestRegistrationSerializer:
    """
    Test cases for validating user registration
    """

    def test_should_validate_user_data(self):
        user = UserFactory.build()
        results = RegistrationSerializer(user).data
        assert user.username == results['username']
        assert results['token']

    def test_should_raise_error_missing_fields(self):
        data = {"invalid_field": "invalid_data"}
        serializer = RegistrationSerializer(data=data)
        with pytest.raises(ValidationError):
            serializer.is_valid(raise_exception=True)

class TestLoginSerializer:
    """
    Test cases for validating user login
    """

    def test_should_validate_user_login(self, mocker):
        user = UserFactory.build()
        serializer = LoginSerializer(data={
            'email': user.email,
            'password': user.password,
        })
        mocker.patch.object(ModelBackend, 'authenticate', return_value=user)
        assert serializer.is_valid()

    def test_should_raise_error_not_matching_user_password(self, mocker):
        data = {
            "email": "test@email.com",
            "password": "testpassword"
        }
        serializer = LoginSerializer(data=data)
        with pytest.raises(NotFound):
            mocker.patch.object(ModelBackend, 'authenticate', return_value=None)
            serializer.is_valid(raise_exception=True)


class TestGoogleSocialSerializer:
    """
    Test cases for validating google signup with the SocialSerializer
    """

    def test_should_validate_cretentials_provided(self, mocker):
        user = UserFactory.build(email='test@gmail.com', username='test@gmail.com')
        data = {'provider': 'google', 'access_token': 'valid_token'}
        mock_oauth_response = {
            'email': 'test@gmail.com',
            'username': 'test@gmail.com',
            'image': 'https://lh3.googleusercontent.com/a-/AOh14GhKFe1wz8TsXyJ50Zhr9GOoSd_GBSx4hUeGfnuHuw',
        }

        mocker.patch.object(
            OauthTokenConverter,
            'get_user_social_info',
            return_value=mock_oauth_response
        )

        mocker.patch.object(User.objects, 'get_or_create_user_from_validated_info', return_value=user)

        serializer = SocialSerializer(data=data)
        assert serializer.is_valid()

    def test_should_raise_error_missing_provider(self):
        data = {"access_token": "valid_token_but_no_provider"}
        serializer = SocialSerializer(data=data)
        with pytest.raises(ValidationError):
            serializer.is_valid(raise_exception=True)

    def test_should_raise_error_missing_access_token(self):
        data = {"provider": "google"}
        serializer = SocialSerializer(data=data)
        with pytest.raises(ValidationError):
            serializer.is_valid(raise_exception=True)


class TestGithubSocialSerializer:
    """
    Test cases for validating Github signup with the SocialSerializer
    """

    def test_should_validate_cretentials_provided(self, mocker):
        user = UserFactory.build()
        data = {'provider': 'github', 'access_token': 'valid_token'}
        mock_oauth_response = {
            'email': 'test@mail.com',
            'username': 'test_user',
            'image': 'https://lh3.googleusercontent.com/a-/AOh14GhKFe1wz8TsXyJ50Zhr9GOoSd_GBSx4hUeGfnuHuw',
        }

        mocker.patch.object(
            OauthTokenConverter,
            'get_user_social_info',
            return_value=mock_oauth_response
        )

        mocker.patch.object(User.objects, 'get_or_create_user_from_validated_info', return_value=user)

        serializer = SocialSerializer(data=data)
        assert serializer.is_valid()

    def test_should_validate_with_code_provided(self, mocker):
        user = UserFactory.build()
        data = {'provider': 'github', 'code': 'valid_code'}
        mock_oauth_response = {
            'email': 'test@mail.com',
            'username': 'test_user',
            'image': 'https://lh3.googleusercontent.com/a-/AOh14GhKFe1wz8TsXyJ50Zhr9GOoSd_GBSx4hUeGfnuHuw',
        }

        mocker.patch.object(
            OauthTokenConverter,
            'get_user_social_info',
            return_value=mock_oauth_response
        )

        mocker.patch.object(User.objects, 'get_or_create_user_from_validated_info', return_value=user)

        serializer = SocialSerializer(data=data)
        assert serializer.is_valid()

    def test_should_raise_error_missing_provider(self):
        data = {"access_token": "valid_token_but_no_provider"}
        serializer = SocialSerializer(data=data)
        with pytest.raises(ValidationError):
            serializer.is_valid(raise_exception=True)

    def test_should_raise_error_missing_token_and_code(self):
        data = {"provider": "github"}
        serializer = SocialSerializer(data=data)
        with pytest.raises(ValidationError):
            serializer.is_valid(raise_exception=True)


class TestUserSerializer:
    """
    Test cases for updating user with UserSerializer
    """

    def test_should_update_fields(self, mocker):
        user = UserFactory.build()
        profile = ProfileFactory.build()
        new_data = {'email': 'new_email@mail.com', 'username': 'new_username'}

        mocker.patch.object(User, 'save')  # prevent saving in the db
        mocker.patch.object(Profile, 'save')
        mocker.patch.object(ReverseOneToOneDescriptor, '__get__', return_value=profile)

        UserSerializer().update(user, new_data)

        assert new_data['email'] == user.email
        assert new_data['username'] == user.username
        assert User.save.called  # assert saving to the db was called

    def test_should_raise_error_unknown_field(self, mocker):
        user = UserFactory.build()
        new_data = {'unknown_field': 'value'}
        with pytest.raises(ValidationError):
            UserSerializer().update(user, new_data)
