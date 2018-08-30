from django.urls import path, include, re_path
from rest_framework_nested import routers

from .views import *
from .account.views import *
from .accommodation.views import *
from .booking.views import *

# Create a router and register our viewsets with it.
router = routers.DefaultRouter()

# Account viewsets
router.register('users', UserViewSet)
router.register('accounts', AccountViewSet)

# Accommodation viewsets
router.register('accommodations', AccommodationViewSet)
router.register('accommodation_images', AccommodationImageViewSet)
router.register('amenities', AmenityViewSet)

# Booking viewsets
router.register('listings', ListingViewSet)
router.register('bookings', BookingViewSet)
router.register('reviews', ReviewViewSet)


user_router = routers.NestedSimpleRouter(router, r'users', lookup='users')
user_router.register(r'listings', ListingViewSet)
user_router.register(r'bookings', BookingViewSet)
user_router.register(r'reviews', ReviewViewSet)

# Routes
urlpatterns = [

    # api routes
    path('', include(router.urls)),
    path('', include('rest_framework.urls')),

    # Authentication routes
    re_path(r'^api-token-auth/', CustomAuthToken.as_view()),
    re_path(r'^rest-auth/', include('rest_auth.urls')),
    re_path(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    re_path(r'^rest-auth/facebook/$', FacebookLogin.as_view(), name='fb_login'),
    re_path(r'^rest-auth/twitter/$', TwitterLogin.as_view(), name='twitter_login'),

]
