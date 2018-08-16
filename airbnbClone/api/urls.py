from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from api import views
from django.conf.urls import url

urlpatterns = [
	path('rest-auth/', include('rest_auth.urls')),
	url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
]