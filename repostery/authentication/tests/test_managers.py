import pytest
from ..models import User

@pytest.mark.django_db
def test_user_manager_create_user():
    User.objects.create_user(
        username='user_name',
        email='email@email.com',
        password='secretpass'
    )
    assert User.objects.get(username='user_name')

def test_user_manager_create_user_fails():
    with pytest.raises(TypeError):
        User.objects.create_user(username='only_username', email=None)

@pytest.mark.django_db
def test_user_manager_create_superuser():
    User.objects.create_superuser(
        username='user_name',
        email='email@email.com',
        password='secretpass'
    )
    assert User.objects.get(username='user_name').is_superuser is True
