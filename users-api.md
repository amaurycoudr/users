# Users API

{% api-method method="post" host="http://localhost:8000" path="/api/users" %}
{% api-method-summary %}
Post users
{% endapi-method-summary %}

{% api-method-description %}
This endpoint allows you to create a new **user**.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="password" type="string" required=true %}
user password length&lt;6 must contains 3 of \[a-z\] / \[A-Z\] / \[0-9\] / \[$@\#&!\]
{% endapi-method-parameter %}

{% api-method-parameter name="email" type="string" required=true %}
user email 
{% endapi-method-parameter %}

{% api-method-parameter name="name" type="string" required=true %}
user name 20 &lt; length &lt; 4
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=201 %}
{% api-method-response-example-description %}
User successfully created 
{% endapi-method-response-example-description %}

```
{
    "name": "amauryLG",
    "email": "amaury@mail.com",
    "id": 1,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW1hdXJ5TEciLCJlbWFpbCI6ImFtYXVyeUxHIiwiaWF0IjoxNjE5ODY1ODU2fQ.XwXVzSEtSRfNGsmzvQUO7EJZhFFh6l0adD4I4-aCJuE"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=400 %}
{% api-method-response-example-description %}
If email or name already used / password invalid /email invalid / username invalid / missing field 
{% endapi-method-response-example-description %}

```
{
    "error": "identifierAlreadyUsed"/"invalidPassword"/"invalidEmail"/"fieldNotFilled"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=500 %}
{% api-method-response-example-description %}
Intern server error
{% endapi-method-response-example-description %}

```
{
    "error": "Unexpected"
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="http://localhost:8000" path="/api/users/login" %}
{% api-method-summary %}
User Login
{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="password" type="string" required=true %}
user password
{% endapi-method-parameter %}

{% api-method-parameter name="identifier" type="string" required=true %}
user email or name
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
User successfully logging
{% endapi-method-response-example-description %}

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW1hdXJ5TEciLCJlbWFpbCI6ImFtYXVyeUxHIiwiaWF0IjoxNjE5OTQ2NTk2fQ.kV5kOIzG-YJCwIAEzP2WtOUfuACr2_bgp9m4e-HoT58"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=400 %}
{% api-method-response-example-description %}
if user provide a bad password
{% endapi-method-response-example-description %}

```
{
    "error": "badPassword"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=404 %}
{% api-method-response-example-description %}
name or email that doesn't exist in the db
{% endapi-method-response-example-description %}

```
{
    "error": "unknownUser"
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="http://localhost:8000" path="/api/users/identifier" %}
{% api-method-summary %}
Check Identifier availability
{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="Identifier" type="string" required=true %}
email or username
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
return if the name or the email is disponible 
{% endapi-method-response-example-description %}

```
{
    "available":"false"
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=400 %}
{% api-method-response-example-description %}
Missing identifier filled
{% endapi-method-response-example-description %}

```
{
    "error": "fieldNotfilled"
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

