from rest_framework import exceptions, status, views

def custom_exception_handler(exc, context):
    """
    By default django rest framework authentication errors return status 403
    we want to change that for the actual 401 UNAUTHORIZED
    """
    response = views.exception_handler(exc, context)

    if isinstance(exc, (exceptions.AuthenticationFailed, exceptions.NotAuthenticated)):
        response.status_code = status.HTTP_401_UNAUTHORIZED

    return response
