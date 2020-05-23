import jwt
from datetime import datetime, timedelta
from time import mktime

from django.db import models
from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser, PermissionsMixin
)
from repostery.core.models import TimestampedModel
from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin, TimestampedModel):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(db_index=True, unique=True)

    # We offer users a way to deactivate their account instead of
    # letting them delete it. That way they won't show up on the site anymore,
    # but we can still analyze the data.

    is_active = models.BooleanField(default=True)

    # The `is_staff` flag is expected by Django to determine who can and cannot
    # log into the Django admin site.
    is_staff = models.BooleanField(default=False)

    # More fields required by Django when specifying a custom user model.
    # The `USERNAME_FIELD` property tells us which field we will use to log in.
    # In this case we want it to be the email field.
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    # Tells Django that the UserManager class defined above should manage
    # objects of this type.
    objects = UserManager()

    def __str__(self):
        return self.email

    @property
    def token(self):
        """
        Allows us to get a user's token by calling `user.token` instead of
        `user.generate_jwt_token().
        """
        return self._generate_jwt_token()

    def get_full_name(self):
        return self.username

    def get_short_name(self):
        return self.username

    def _generate_jwt_token(self):
        expire_date = datetime.now() + timedelta(days=60)

        token = jwt.encode(
            {
                'id': self.pk,
                'exp': mktime(expire_date.timetuple())
            },
            settings.SECRET_KEY,
            algorithm='HS256'
        )

        return token.decode('utf-8')
