# Users API

{% api-method method="post" host="http://localhost:8000" path="/api/users" %}
{% api-method-summary %}
Post users
{% endapi-method-summary %}

{% api-method-description %}
This endpoint allows you to get free cakes.
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

{% api-method-response-example httpCode=404 %}
{% api-method-response-example-description %}
Could not find a cake matching this query.
{% endapi-method-response-example-description %}

```
{    "message": "Ain't no cake like that."}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}



