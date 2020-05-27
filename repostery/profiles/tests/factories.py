import factory


class ProfileFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = 'profiles.Profile'

    id = factory.Sequence(lambda n: n)
    image = factory.Faker('image_url')
