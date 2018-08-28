# portBnB - An Amazing Accommodation Renting Application
## Front-End UI: HTML, CSS, Javascript, React, VueJs
## Back-End: Django

Setup guide:
* Run these commands on terminal
```
pip install django-extensions Werkzeug pyOpenSSL
pip install -r requirements.txt
```

Run server:
```
./run.sh
```
or
```
python manage.py runserver_plus --cert-file /tmp/cert
```
Access this link on web browser https://localhost:8000/basic_func

## API End-points
* Login
```
POST /api/v1/rest-auth/login/
```
* Logout
```
/api/v1/rest-auth/logout/
```
* Register
```
/api/v1/rest-auth/registration/
```
* Facebook
```
/api/v1/rest-auth/facebook/
```
* Twitter
```
/api/v1/rest-auth/twitter/
```