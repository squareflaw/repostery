from rest_framework import status, viewsets, mixins
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from repostery.core.validators import validateFieldExist
from .serializers import (
    RegistrationSerializer,
    LoginSerializer,
    SocialSerializer,
    UserSerializer,
)
from .models import User

class RegistrationViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    # allow any user (authenticated or not) to hit this endpoint
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

    def create(self, request):
        user = request.data.get('user', {})
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def create(self, request):
        user = request.data.get('user', {})
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SocialSignupViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    permission_classes = (AllowAny,)
    serializer_class = SocialSerializer

    def list(self, request):
        serializer = self.serializer_class(data={
            'provider': request.query_params.get('provider', 'google'),
            'access_token': request.query_params.get('access_token'),
            'code': request.query_params.get('code'),
        })
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserRetrieveUpdateViewSet(mixins.RetrieveModelMixin,
                                mixins.UpdateModelMixin,
                                viewsets.GenericViewSet):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    lookup_field = 'username'

    def retrieve(self, request, *args, **kwargs):
        # There is nothing to validate or save here. Instead, we just want the
        # serializer to handle turning our `User` object into something that
        # can be JSONified and sent to the client.
        serializer = self.serializer_class(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        FIELDS = (
            'username',
            'email',
            'password',
            'image',
        )
        validateFieldExist(request, 'user', FIELDS)

        user_data = request.data.get('user', {})
        profile_data = {
            'image': user_data.pop('image', None)
        }
        serializer = self.serializer_class(
            request.user,
            data=user_data,
            context={'profile': profile_data},
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status.HTTP_200_OK)
