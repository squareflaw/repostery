# Users Authentication

## Registration 
Authorization tokens are issued and returned when a user registers.

**Request**:

`POST` `/api/v1/users`

Parameters:

**Body**

```json
{   
    "user": {
        "email": "email@example.com",
        "username": "username_example",
        "password": "secretpassword"
    }
}
```

**Response**:

```json
Content-Type application/json
201 CREATED
{
    "email": "email@example.com",
    "username": "exampleuser",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6OSwiZXhwIjoxNTk1MzcwODQ4LjB9._3sJ-jfAPU3A3Tc2c7uVZ2d-ulavsGkUN5QX3hYs1Lw"
}
```

The `token` returned with this response should be stored by the client for
authenticating future requests to the API.

## Login
A registered user can also retrieve their token with the following request:

**Request**:

`POST` `/api/v1/users/login`

Parameters:

**Body**

```json
{   
    "user": {
        "email": "email@example.com",
        "password": "secretpassword",
    }
}
```
**Response**:

```json
Content-Type application/json
200 OK
{
    "email": "email@example.com",
    "username": "exampleuser",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6OSwiZXhwIjoxNTk1MzcxMDE5LjB9.N6PnGrXRwLEmUmeH8k09wRB2zIzKuPAyw1pJIGS2vls"
}
```

## Authenticate requests
For clients to authenticate, the token key should be included in the Authorization HTTP header.The key should be prefixed by the string literal "Token", with whitespace separating the two strings. For example:

```
Authorization: Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6OSwiZXhwIjoxNTk1MzcxMDE5LjB9.N6PnGrXRwLEmUmeH8k09wRB2zIzKuPAyw1pJIGS2vls
```

Unauthenticated responses that are denied permission will result in an HTTP `401 Unauthorized` response with an appropriate `WWW-Authenticate` header. For example:

```
WWW-Authenticate: Token
```

The curl command line tool may be useful for testing token authenticated APIs. For example:

```bash
curl -X GET http://127.0.0.1:8000/api/v1/example/ -H 'Authorization: Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6OSwiZXhwIjoxNTk1MzcxMDE5LjB9.N6PnGrXRwLEmUmeH8k09wRB2zIzKuPAyw1pJIGS2vls'
```
