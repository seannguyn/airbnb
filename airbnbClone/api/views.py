from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# from api.serializers import UserSerializer
from django.contrib.auth.models import User

from api import views

# Facebook 
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.social_serializers import TwitterLoginSerializer
from rest_auth.registration.views import SocialLoginView

#Twitter
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from rest_auth.registration.views import SocialLoginView
from rest_auth.social_serializers import TwitterLoginSerializer


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

class TwitterLogin(SocialLoginView):
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter