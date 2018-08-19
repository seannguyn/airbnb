"""airbnbClone URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from basic_func import views
from django.conf.urls import url
from api import views

from rest_framework import routers
from rest_framework.authtoken import views as authviews

router = routers.DefaultRouter()
router.register('accommodation',views.AccommodationView)

app_name = 'main'

urlpatterns = [
    path('admin/', admin.site.urls),

    # old stuffs
    path('accounts/', include('allauth.urls')),
    path('api/', include('api.urls')),
    path('basic_func/', include('basic_func.urls')),

    path('api/v1/', include('api.urls')), #api urls
    url(r'^users/', include('api.urls')),
    path('',include('api.urls')),
    path('api-token-auth/', authviews.obtain_auth_token, name='api-token-auth'),
]
