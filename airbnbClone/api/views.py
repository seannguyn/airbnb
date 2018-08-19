from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
# from api.serializers import UserSerializer
from rest_framework import viewsets
from django.contrib.auth.models import User
from api.models import Accommodation, AccommodationImage, AccommodationHosting, Booking, Review
from api.serializers import AccommodationSerializer, AccommodationImageSerializer, AccommodationHostingSerializer,BookingSerializer, ReviewSerializer
from django.http import Http404

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

    def get_queryset(self):
        """ allow rest api to filter by submissions """
        queryset = Accommodation.objects.all()
        user = self.request.query_params.get('user', None)
        id = self.request.query_params.get('id', None)
        
        if user is not None:
            queryset = queryset.filter(user=user)

        if id is not None:
            queryset = queryset.filter(id=id)

        return queryset



class AccommodationView(viewsets.ModelViewSet):
    queryset = Accommodation.objects.all()
    # queryset = Accomodation.objects.filter(user__username__exact="sean")
    serializer_class = AccommodationSerializer
    
    # print('Go to review')    
    @action(methods=['get'], detail=False)
    def review(self, request, pk=True):
        print('Go to review')



class AccommodationImageView(viewsets.ModelViewSet):
    queryset = AccommodationImage.objects.all()
    # queryset = Accomodation.objects.filter(user__username__exact="sean")
    serializer_class = AccommodationImageSerializer

    def get_queryset(self):
        """ allow rest api to filter by submissions """
        queryset = AccommodationImage.objects.all()
        accommodation = self.request.query_params.get('accommodation', None)
        if accommodation is not None:
            queryset = queryset.filter(accommodation=accommodation)

        return queryset



class AccommodationHostingView(viewsets.ModelViewSet):
    queryset = AccommodationHosting.objects.all()
    # queryset = Accomodation.objects.filter(user__username__exact="sean")
    serializer_class = AccommodationHostingSerializer

    def get_queryset(self):
        """ allow rest api to filter by submissions """
        queryset_1 = Accommodation.objects.all()
        queryset_2 = AccommodationHosting.objects.all()

        user = self.request.query_params.get('user', None)
        
        if user is not None:
            ids = queryset_1.values_list('id', flat=True).filter(user=user)
            queryset_2 = queryset_2.filter(accommodation__in=set(ids))

        return queryset_2



class BookingView(viewsets.ModelViewSet):
    queryset = Booking.objects.all()

    # queryset = Accomodation.objects.filter(user__username__exact="sean")
    serializer_class = BookingSerializer

    def get_queryset(self):
        """ allow rest api to filter by submissions """
        queryset = Booking.objects.all()
        booker = self.request.query_params.get('booker', None)
        host = self.request.query_params.get('host', None)

        if booker is not None:
            queryset = queryset.filter(booker=booker)

        if host is not None:
            queryset = queryset.filter(hosting=host)

        return queryset


class ReviewView(viewsets.ModelViewSet):

    queryset = Review.objects.all()

    serializer_class = ReviewSerializer

    def get_queryset(self):
        queryset = Review.objects.all() #initialise queryset

        """ Get reviews for a specific accommodation """
        """ GET accommodation/{accomodation_pk}/review """
        accommodation_pk = self.kwargs['accommodation_pk']
        if accommodation_pk is not None:
            queryset = queryset.filter(accommodation=accommodation_pk)
            if not queryset:
                raise Http404('Review does not exist for this accommodation')
            
            return queryset

        # TODO: GET USER REVIEW
        # Must be a logged in user
        """ Get reviews that a specific user made """