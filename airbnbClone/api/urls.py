from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from api import views
from django.conf.urls import url
from rest_framework import routers
from rest_framework_nested import routers

router = routers.DefaultRouter()

router.register('accommodation',views.AccommodationView)
router.register('accommodationImage',views.AccommodationImageView)
router.register('accommodationHosting',views.AccommodationHostingView)
router.register('booking',views.BookingView)
router.register('users', views.Users)
router.register('reviews', views.GetReviews)

""" accomodation nested resources setup """
accommodation_router = routers.NestedSimpleRouter(router, r'accommodation', lookup='accommodation')
accommodation_router.register(r'reviews', views.AccomodationReviews)

""" users nested resources setup """
user_router = routers.NestedSimpleRouter(router, r'users', lookup='user')
user_router.register(r'reviews', views.UserReviews)


urlpatterns = [
	path('rest-auth/', include('rest_auth.urls')),
	url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
	url(r'^rest-auth/facebook/$', views.FacebookLogin.as_view(), name='fb_login'),
	url(r'^rest-auth/twitter/$', views.TwitterLogin.as_view(), name='twitter_login'),
	
	path('', include(router.urls)),
	path('', include(accommodation_router.urls)),
	path('', include(user_router.urls)),

	# url('^accommodationHosting/(?P<id>.+)/$', views.AccommodationHostingView.as_view({'get': 'list'})),
	# path('accommodationHosting/<id>/$', views.AccommodationHostingView.as_view()),

	path('rest-auth/', include('rest_auth.urls')),
	url(r'^api-token-auth/', views.CustomAuthToken.as_view()),
]


# urlpatterns = format_suffix_patterns(urlpatterns)
