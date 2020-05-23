from rest_framework import serializers

from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    image = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ('id', 'username', 'image',)
        read_only_fields = ('username',)

    def get_image(self, obj):
        if obj.image:
            return obj.image
        return 'https://static.productionready.io/images/smiley-cyrus.jpg'
