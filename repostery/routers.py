from rest_framework.routers import DefaultRouter

router = DefaultRouter(trailing_slash=False)

#   authentication

from .authentication.views import RegistrationViewSet
from .authentication.views import LoginViewSet
from .authentication.views import UserRetrieveUpdateViewSet

router.register(r'users', RegistrationViewSet, 'registration')
router.register(r'users/login', LoginViewSet, 'login')
router.register(r'user', UserRetrieveUpdateViewSet, 'user')

# profiles

from .profiles.views import ProfileRetrieveViewSet
router.register(r'profiles', ProfileRetrieveViewSet, 'profile')
