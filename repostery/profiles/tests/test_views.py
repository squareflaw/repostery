from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
import pytest
import json

# RegistrationViewSet

@pytest.mark.django_db
def test_profile_retrieve_success(client):
    user_data = {
        'username': 'user1',
        'email': "email@cookie.com",
        'password': 'user1pass'
    }
    User = get_user_model()
    user = User.objects.create_user(**user_data)
    url = reverse('profile-detail', kwargs={'username': user.username})
    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert json.loads(response.content).get('username') == user.username


@pytest.mark.django_db
def test_register_user_fails(client):
    url = reverse('profile-detail', kwargs={'username': 'invalid_username'})
    response = client.get(url)
    assert response.status_code == status.HTTP_404_NOT_FOUND
