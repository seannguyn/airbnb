from django.urls import path, include, re_path
from rest_framework_nested import routers

from .views import *

router = routers.DefaultRouter()

router.register('accommodation', AccommodationView)
router.register('accommodationImage', AccommodationImageView)
router.register('accommodationHosting', AccommodationHostingView)
router.register('booking', BookingView)
router.register('users', Users)
router.register('reviews', GetReviews)

""" accomodation nested resources setup """
accommodation_router = routers.NestedSimpleRouter(router, r'accommodation', lookup='accommodation')
accommodation_router.register(r'reviews', AccomodationReviews)

""" users nested resources setup """
user_router = routers.NestedSimpleRouter(router, r'users', lookup='user')
user_router.register(r'reviews', UserReviews)

urlpatterns = [
    path('rest-auth/', include('rest_auth.urls')),
    re_path(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    re_path(r'^rest-auth/facebook/$', FacebookLogin.as_view(), name='fb_login'),
    re_path(r'^rest-auth/twitter/$', TwitterLogin.as_view(), name='twitter_login'),

    path('', include(router.urls)),
    path('', include(accommodation_router.urls)),
    path('', include(user_router.urls)),

    re_path(r'^api-token-auth/', CustomAuthToken.as_view()),
]
