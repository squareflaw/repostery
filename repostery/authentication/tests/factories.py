import factory


class UserFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = 'authentication.User'
        django_get_or_create = ('username',)

    id = factory.Sequence(lambda n: n)
    username = factory.Sequence(lambda n: f'testuser{n}')
    password = factory.Faker('password', length=10, special_chars=True, digits=True,
                             upper_case=True, lower_case=True)
    email = factory.Faker('email')
    is_active = True
    is_staff = False
