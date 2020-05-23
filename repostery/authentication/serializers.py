from rest_framework import serializers
from rest_framework.exceptions import NotFound
from django.contrib.auth import authenticate

from repostery.profiles.serializers import ProfileSerializer
from .models import User

class RegistrationSerializer(serializers.ModelSerializer):
    """Serializers registration request and creates a new user."""

    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True   # can not be read by the client
    )

    # The client should not be able to send a token along with a registration
    # request. by making 'token' read_only we can make sure that
    token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'token']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255)
    username = serializers.CharField(max_length=255, read_only=True)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        # The `validate` method is where we make sure that the current
        # instance of `LoginSerializer` has "valid". In the case of logging a
        # user in, this means validating that they've provided an email
        # and password and that this combination matches one of the users in
        # our database.
        email = data.get('email', None)
        password = data.get('password', None)

        if email is None:
            raise serializers.ValidationError(
                'An email address is required to log in.'
            )

        if password is None:
            raise serializers.ValidationError(
                'A password is required to log in.'
            )

        # The `authenticate` method is provided by Django and handles checking
        # for a user that matches this email/password combination.
        # we pass `email` as the `username` value since in our User
        # model we set `USERNAME_FIELD` as `email`.
        user = authenticate(username=email, password=password)

        if user is None:
            raise NotFound(
                'A user with this email and password was not found'
            )

        # purpose of this flag is to tell us whether the user has been banned
        # or deactivated.
        if not user.is_active:
            raise serializers.ValidationError(
                'This user has been deactivated'
            )

        return {
            'email': user.email,
            'username': user.username,
            'token': user.token,
        }

class UserSerializer(serializers.ModelSerializer):
    """Handles serialization and deserialization of user objects"""
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )
    # When a field should be handled as a serializer, we must explicitly say
    # so. Moreover, `UserSerializer` should never expose profile information,
    # so we set `write_only=True`.
    profile = ProfileSerializer(write_only=True)
    image = serializers.CharField(source='profile.image')

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'token', 'profile', 'image',)
        read_only_fields = ('token',)

    def update(self, instance, validated_data):
        # Passwords should not be handled with `setattr`, unlike other fields.
        # Django provides a function that handles hashing and
        # salting passwords. That means
        # we need to remove the password field from the
        # `validated_data` dictionary before iterating over it.
        password = validated_data.pop('password', None)
        profile_data = self.context.get('profile', {})

        for (key, value) in validated_data.items():
            setattr(instance, key, value)

        if password is not None:
            # `.set_password()`  handles all
            # of the security stuff that we shouldn't be concerned with.
            instance.set_password(password)
        instance.save()

        for (key, value) in profile_data.items():
            # this time we're making changes to the Profile model.
            setattr(instance.profile, key, value)
        instance.profile.save()

        return instance
