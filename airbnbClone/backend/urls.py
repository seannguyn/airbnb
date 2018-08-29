from django.urls import path, include
from rest_framework_nested import routers

from .account.views import *
from .accommodation.views import *
from .booking.views import *

# Create a router and register our viewsets with it.
router = routers.DefaultRouter()

# Account viewsets
router.register('users', UserViewSet)
router.register('accounts', AccountViewSet)
router.register('profile_images', ProfileImageViewSet)

# Accommodation viewsets
router.register('accommodation', AccommodationViewSet)
router.register('accommodationImages', AccommodationImageViewSet)
router.register('amenities', AmenityViewSet)

# Booking viewsets
router.register('listings', ListingViewSet)
router.register('booking', BookingViewSet)
router.register('reviews', ReviewViewSet)

""" accomodation nested resources setup """
# accommodation_router = routers.NestedSimpleRouter(router, r'accommodation', lookup='accommodation')
# accommodation_router.register(r'reviews', views.AccomodationReviews)

urlpatterns = [
    path('', include(router.urls)),
]
