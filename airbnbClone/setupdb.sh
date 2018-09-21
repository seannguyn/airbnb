#!/usr/bin/env bash

db=./db.sqlite3
py=../venv/Scripts/python.exe


if [ ! -f ${db} ]; then
    ${py} manage.py makemigrations
    ${py} manage.py migrate

    echo "from django.contrib.auth import get_user_model; User = get_user_model(); \
    User.objects.create_superuser('admin', 'admin@portbnb.com', 'comp3900'); \
    User.objects.create_superuser('alice', 'alice@portbnb.com', 'comp3900'); \
    User.objects.create_superuser('bobby', 'bobby@portbnb.com', 'comp3900'); \
    User.objects.create_superuser('carol', 'carol@portbnb.com', 'comp3900'); \
    User.objects.create_superuser('david', 'david@portbnb.com', 'comp3900'); \
    User.objects.create_superuser('eliza', 'elise@portbnb.com', 'comp3900'); \
    User.objects.create_superuser('frank', 'frank@portbnb.com', 'comp3900'); \
    User.objects.create_superuser('grant', 'grant@portbnb.com', 'comp3900')" \
    | ${py} manage.py shell
else
   ${py} manage.py makemigrations
   ${py} manage.py migrate
fi


${py} manage.py runserver_plus --cert-file tmp/cert