from django.shortcuts import render
# from api.serializers import UserSerializer

from django.contrib.auth.models import User
from api.models import Accommodation, AccommodationImage, AccommodationHosting, Booking, Review, UserInfo
from api.serializers import AccommodationSerializer, AccommodationImageSerializer, AccommodationHostingSerializer,BookingSerializer, ReviewSerializer, UserInfoSerializer
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication

from django.http import HttpResponse, HttpResponseNotFound, Http404
from api import views

from .functions import compareDate

# Facebook
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.social_serializers import TwitterLoginSerializer
from rest_auth.registration.views import SocialLoginView

#Twitter
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from rest_auth.registration.views import SocialLoginView
from rest_auth.social_serializers import TwitterLoginSerializer

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)



class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class TwitterLogin(SocialLoginView):
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter


@api_view(["GET, POST"])
@permission_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
class AccommodationView(viewsets.ModelViewSet):
    queryset = Accommodation.objects.all()
    # queryset = Accomodation.objects.filter(user__username__exact="sean")
    serializer_class = AccommodationSerializer

    def get_queryset(self):
        """ allow rest api to filter by submissions """
        queryset = Accommodation.objects.all()

        user = self.request.query_params.get('user', None)

        print("get user")
        if user is not None:
            queryset = queryset.filter(user=user)

        return queryset


""" Get accomodation review """
class AccommodationView(viewsets.ModelViewSet):
    queryset = Accommodation.objects.all()
    # queryset = Accomodation.objects.filter(user__username__exact="sean")
    serializer_class = AccommodationSerializer

    @action(methods=['get'], detail=False)
    def review(self, request, pk=True):
        print('Go to review')

    def get_queryset(self):
        """ allow rest api to filter by submissions """
        queryset = Accommodation.objects.all()

        user = self.request.query_params.get('user', None)
        id = self.request.query_params.get('id', None)
        print("get user")
        if user is not None:
            queryset = queryset.filter(user=user)

        if id is not None:
            queryset = queryset.filter(id=id)

        return queryset


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

    # def get_object(self, pk):
    #     try:
    #         return AccommodationHosting.objects.get(pk=pk)
    #     except AccommodationHosting.DoesNotExist:
    #         raise Http404

    # def get(self, request, pk, format=None):
    #     myHostObject = self.get_object(pk)
    #     serializer = self.serializer_class(myHostObject)
    #     return Response(serializer.data)
    def get(self, request):
        pk = request.GET.get('pk')
        myHostObject = AccommodationHosting.objects.get(pk=pk)
        serializer = self.serializer_class(myHostObject)
        return Response(serializer.data)

    """ handling PUT request and backend validation"""
    def update(self, request, pk, format=None):

        new_date_start = request.data['date_start']
        new_date_end = request.data['date_end']
        new_price = request.data['price']
        new_description = request.data['description']

        myHostObject = AccommodationHosting.objects.get(pk=pk) #self.get_object(pk)

        myHostObject.date_start = new_date_start
        myHostObject.date_end = new_date_end
        myHostObject.price = new_price
        myHostObject.description = new_description

        myHostObject.save()

        return Response(request.data, status=status.HTTP_200_OK)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    """ handling POST request backend validation"""
    def create(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        date_start = request.data['date_start']
        date_end = request.data['date_end']

        check_valid = compareDate(date_start, date_end)

        if serializer.is_valid():

            if check_valid <= 0:
                return Response({"date": "start date must be before end date"}, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        """ allow rest api to filter by submissions """
        print("TO ACC HOST QUEYR")
        queryset_1 = Accommodation.objects.all()
        queryset_2 = AccommodationHosting.objects.all()
        print("GET REQUEST OKOKOKOK ")

        user = self.request.query_params.get('user', None)
        accomm = self.request.query_params.get('accomm', None)

        if user is not None:
            ids = queryset_1.values_list('id', flat=True).filter(user=user)
            queryset_2 = queryset_2.filter(accommodation__in=set(ids))

        if accomm is not None:
            queryset_2 = queryset_2.filter(accommodation=accomm)

        return queryset_2


    # user_pk = self.kwargs['user_pk']

    #     if user_pk is not None:
    #         queryset = queryset.filter(user=user_pk)
    #         if not queryset:
    #             raise Http404('Review does not exist for this accommodation')

    #         return queryset

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


""" get all the reviews """
class GetReviews(viewsets.ModelViewSet):
    queryset = Review.objects.all()

    serializer_class = ReviewSerializer

    def get_queryset(self):
        queryset = Review.objects.all()
        return queryset


""" GET the reviews made by an user """
""" GET /users/{user_id}/reviews """
class UserReviews(viewsets.ModelViewSet):

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def get_queryset(self):

        queryset = Review.objects.all()
        user_pk = self.kwargs['user_pk']

        if user_pk is not None:
            queryset = queryset.filter(user=user_pk)
            if not queryset:
                raise Http404('Review does not exist for this accommodation')

            return queryset


""" Get reviews for a specific accommodation """
""" GET accommodation/{accomodation_pk}/reviews/ """
class AccomodationReviews(viewsets.ModelViewSet):

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def get_queryset(self):
        queryset = Review.objects.all() #initialise queryset
        accommodation_pk = self.kwargs['accommodation_pk']

        if accommodation_pk is not None:
            queryset = queryset.filter(accommodation=accommodation_pk)

            if not queryset:
                raise Http404('Review does not exist for this accommodation')

            return queryset


""" GET all current users """
""" /users/ """
class Users(viewsets.ModelViewSet):

    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer



    """ This would get all users """
    def get_queryset(self):
        queryset = UserInfo.objects.all()
        print("FOES DD", queryset)
        # user_pk = None
        # if self.kwargs:
        #     user_pk = self.kwargs['pk']

        # if user_pk is not None:
        #     """ return username if /users/id exist """
        #     queryset = queryset.filter(user=user_pk)
        #     user = UserInfo.objects.get(pk=user_pk)
        #     print("USERNAME: ", user.user.username, type(user.user.username))
        print("FOES DD", queryset)
        return queryset

    # def get(self, request, pk, format=None):
    #     print("FUCK")
    #     myHostObject = self.get_object(pk)
    #     serializer = self.serializer_class(myHostObject)
    #     return Response(serializer.data)

    # def get_object(self):
    #     print("FICL")
    #     # pk = request.GET.get('pk')
    #     # myHostObject = AccommodationHosting.objects.get(pk=pk)
    #     # serializer = self.serializer_class(myHostObject)
    #     # return Response(serializer.data)
    #     return 1

    # def get_queryset(self):
    #     """ get the current login user """
    #     user = self.request.user
    #     return UserInfo.objects.filter(user=user)


""" Custom authentication - return Token, username and email """
class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                         context={'request': request})
        print("DATA: ", request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'username': user.username
        })
