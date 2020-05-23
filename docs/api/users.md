# Users
Endpoint for getting and updating user information

## Get user's information
You can only retrieve/update the user whose token authenticacion belongs to.

**Request**:

`GET` `/api/v1/user/:username`

Parameters:

- **username**

*Note:*

- **[Authorization Protected](authentication.md)**

**Response**:

```json
Content-Type application/json
200 OK
{
    "email": "example@email.com",
    "username": "example_username",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NywiZXhwIjoxNTk1MzcyNjQ3LjB9.DVV8aZ8xtBMW0eCGN9taThoLu4469Bxr0ho5En9rhdY",
    "image": "link to image"
}
```

## Update user's information
You can only retrieve/update the user whose token authenticacion belongs to.

**Request**:

`PUT` `/api/v1/user/:username`

Parameters:

- **username**

**Body**

```json
{   
    "user": {
        "email": "new_example@email.com",
        "username": "new_example_username",
        "password": "new_secrepass",
        "image": "link to image"
    }
}
```
*Note:*

- All parameters are optional
- **[Authorization Protected](authentication.md)**

**Response**:

```json
Content-Type application/json
200 OK
{
    "email": "example@email.com",
    "username": "example_username",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NywiZXhwIjoxNTk1MzcyNjQ3LjB9.DVV8aZ8xtBMW0eCGN9taThoLu4469Bxr0ho5En9rhdY",
    "image": "link to image"
}
```

## Get user's profile information
Profiles are created automaticaly when a new user registers. The user object
takes care of authentication only. Everything else is done with the profile 
(user.profile)

**Request**:

`GET` `/api/v1/profiles/:username`

Parameters:

- **username**

**Response**:

```json
Content-Type application/json
200 OK
{
    "id": "5d47d15f-ab73-4e50-ad21-b6e8f560909a",
    "username": "username_example",
    "image": "link to image"
}
```

