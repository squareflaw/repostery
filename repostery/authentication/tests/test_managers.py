import pytest
from ..models import User

class TestUserManager:
    """
    Test cases for creating users with our custom User Manager class
    """

    def test_should_create_user(self, mocker):
        user_data = {
            'username': 'user_name',
            'email': 'email@email.com',
            'password': 'secretpass'
        }
        mocker.patch.object(User, 'save')  # prevent hitting the db
        user = User.objects.create_user(**user_data)
        assert user.username == user_data.get('username')
        assert User.save.called  # test if function performed save to database

    def test_should_raise_error_missing_field(self):
        with pytest.raises(TypeError):
            User.objects.create_user(username='only_username')

    def test_should_create_superuser(self, mocker):
        user_data = {
            'username': 'user_name',
            'email': 'email@email.com',
            'password': 'secretpass'
        }
        mocker.patch.object(User, 'save')  # prevent hitting the db
        user = User.objects.create_superuser(**user_data)
        assert user.is_superuser and user.is_staff
        assert User.save.called
