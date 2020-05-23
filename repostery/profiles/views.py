from rest_framework import status, mixins, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import NotFound
from rest_framework.response import Response

from .models import Profile
from .serializers import ProfileSerializer

class ProfileRetrieveViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Profile.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = ProfileSerializer
    lookup_field = 'username'

    def retrieve(self, request, username, *args, **kwargs):
        try:
            profile = Profile.objects.select_related('user').get(
                user__username=username
            )
        except Profile.DoesNotExist:
            raise NotFound('The requested profile does not exist.')
        serializer = self.serializer_class(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
