from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from api import views
from django.conf.urls import url
from rest_framework import routers

router = routers.DefaultRouter()
router.register('accommodation',views.AccommodationView)
router.register('accommodationImage',views.AccommodationImageView)
router.register('accommodationHosting',views.AccommodationHostingView)


urlpatterns = [
	path('rest-auth/', include('rest_auth.urls')),
	url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
	url(r'^rest-auth/facebook/$', views.FacebookLogin.as_view(), name='fb_login'),
	url(r'^rest-auth/twitter/$', views.TwitterLogin.as_view(), name='twitter_login'),
	path('',include(router.urls))
]


# urlpatterns = format_suffix_patterns(urlpatterns)
