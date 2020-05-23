import factory


class ProfileFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = 'profiles.Profile'

    user = factory.SubFactory("cookieproject.authentication.tests.factories.UserFactory")
