from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
import pytest
import json
from .factories import UserFactory

# ------------------------------------------------------------------------------
# RegistrationViewSet
# ------------------------------------------------------------------------------

@pytest.mark.django_db
def test_register_user_success(client):
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
def test_register_user_fails(client):
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

# ------------------------------------------------------------------------------
# LoginViewSet
# ------------------------------------------------------------------------------

@pytest.mark.django_db
def test_login_user_success(client):
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
def test_login_user_fails(client):
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

# ------------------------------------------------------------------------------
# UserRetrieveUpdateViewSet
# ------------------------------------------------------------------------------

@pytest.mark.django_db
def test_user_retrive_success(client):
    user = UserFactory()
    url = reverse('user-detail', kwargs={'username': user.username})
    response = client.get(
        url,
        HTTP_AUTHORIZATION=f'Token {user.token}'
    )
    assert response.status_code == status.HTTP_200_OK
    assert json.loads(response.content).get('username') == user.username

@pytest.mark.django_db
def test_user_retrieve_fails_unauthorized(client):
    user = UserFactory()
    url = reverse('user-detail', kwargs={'username': user.username})
    response = client.get(url, HTTP_AUTHORIZATION='')
    assert response.status_code == status.HTTP_403_FORBIDDEN

@pytest.mark.django_db
def test_user_update_success(client):
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
def test_user_update_fails_unauthorized(client):
    user = UserFactory()
    url = reverse('user-detail', kwargs={'username': user.username})
    response = client.put(url, HTTP_AUTHORIZATION='')
    assert response.status_code == status.HTTP_403_FORBIDDEN
