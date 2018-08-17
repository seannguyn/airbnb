from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# from api.serializers import UserSerializer
from rest_framework import viewsets
from django.contrib.auth.models import User
from api.models import Accommodation, AccommodationImage, AccommodationHosting
from api.serializers import AccommodationSerializer, AccommodationImageSerializer, AccommodationHostingSerializer


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

class AccommodationView(viewsets.ModelViewSet):
    queryset = Accommodation.objects.all()
    # queryset = Accomodation.objects.filter(user__username__exact="sean")
    serializer_class = AccommodationSerializer

class AccommodationImageView(viewsets.ModelViewSet):
    queryset = AccommodationImage.objects.all()
    # queryset = Accomodation.objects.filter(user__username__exact="sean")
    serializer_class = AccommodationImageSerializer

class AccommodationHostingView(viewsets.ModelViewSet):
    queryset = AccommodationHosting.objects.all()
    # queryset = Accomodation.objects.filter(user__username__exact="sean")
    serializer_class = AccommodationHostingSerializer
