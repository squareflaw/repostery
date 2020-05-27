from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    """
    Django requires that custom users define their own Manager class. By
    inheriting from `BaseUserManager`, we get a lot of the same code used by
    Django to create a `User`.
    """

    def create_user(self, username, email, password=None):
        if username is None:
            raise TypeError('Users must have a username.')

        if email is None:
            raise TypeError('Users must have an email address.')

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, email, password):
        if password is None:
            raise TypeError('Superuser must have a password.')

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user

    def get_or_create_user_from_validated_info(self, user_info):
        try:
            user = self.model.objects.get(username=user_info['username'])
        except self.model.DoesNotExist:
            user = self.create_user(
                username=user_info['username'],
                email=user_info['email'],
            )

        # to keep profile image updated
        if user.profile.image != user_info.get('image'):
            user.profile.image = user_info.get('image')
            user.save()

        return user
