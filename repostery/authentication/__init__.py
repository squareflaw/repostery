from django.apps import AppConfig

class AuthenticationAppConfig(AppConfig):
    name = 'repostery.authentication'
    label = 'authentication'
    verbose_name = 'Authentication'

    def ready(self):
        import repostery.authentication.signals


default_app_config = 'repostery.authentication.AuthenticationAppConfig'
