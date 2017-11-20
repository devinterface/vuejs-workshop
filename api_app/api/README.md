## Usage
* gem install bundler
* bundle install
* rake db:create
* rake db:seed
* rails s

### Get a JWT Authentication Token
To perform **sign_in** you must perform a POST request to **/api/v1/user_token** with body:

```json
{
  "auth": {
    "email": "workshop@devinterface.com",
    "password": "password"
  }
}
```

### Use the JWT Authentication Token to perform requests that require Authentication
In order to perform requests that require Authentication you must use an **Authorization** header containing:

```
Bearer: your_jwt_token
```
