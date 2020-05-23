import uuid
from django.db import models
from repostery.core.models import TimestampedModel

# Users are for authentication and authorization (permissions).

# By contrast, the Profile model is all about displaying a user’s information
# in the UI. Our client will include profile pages for each user, which
# is where the name of the Profile model comes from.

class Profile(TimestampedModel):
    # Every user will have one, and only one, related Profile model.
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        'authentication.User', on_delete=models.CASCADE)

    image = models.URLField(blank=True, null=True)

    follows = models.ManyToManyField(
        'self',
        related_name='followed_by',
        symmetrical=False)

    def __str__(self):
        return self.user.username

    def follow(self, profile):
        self.follows.add(profile)

    def unfollow(self, profile):
        self.follows.remove(profile)

    def is_following(self, profile):
        return self.follows.filter(pk=profile.pk).exists()

    def is_followed_by(self, profile):
        return self.followed_by.filter(pk=profile.pk).exists()
