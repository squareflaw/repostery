from rest_framework.exceptions import ValidationError

def validateFieldExist(request, objKey, fields):
    data = request.data.get(objKey, {})

    for (key, value) in data.items():
        if key not in fields:
            raise ValidationError(
                "{} field doesn't exist".format(key)
            )
