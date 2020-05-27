from rest_framework.exceptions import ValidationError

def validateFieldExist(fields, data_dict):
    for (key, value) in data_dict.items():
        if key not in fields:
            raise ValidationError(
                "{} field doesn't exist".format(key)
            )
