from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include, re_path
from rest_framework_nested import routers

from . import views

router = routers.DefaultRouter()

router.register('accommodation', views.AccommodationView)
router.register('accommodationImage', views.AccommodationImageView)
router.register('accommodationHosting', views.AccommodationHostingView)
router.register('booking', views.BookingView)
router.register('users', views.Users)
router.register('reviews', views.GetReviews)
router.register('search', views.SearchViews)
router.register('searchHosting', views.SearchHostingViews, base_name='searchHosting')
router.register('reviewCounter', views.ReviewCountViews)
router.register('bookRequest', views.BookRequestViews)

""" accomodation nested resources setup """
accommodation_router = routers.NestedSimpleRouter(router, r'accommodation', lookup='accommodation')
accommodation_router.register(r'reviews', views.AccomodationReviews)

""" users nested resources setup """
user_router = routers.NestedSimpleRouter(router, r'users', lookup='user')
user_router.register(r'reviews', views.UserReviews)

urlpatterns = [
    path('rest-auth/', include('rest_auth.urls')),
    re_path(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    re_path(r'^rest-auth/facebook/$', views.FacebookLogin.as_view(), name='fb_login'),
    re_path(r'^rest-auth/twitter/$', views.TwitterLogin.as_view(), name='twitter_login'),

    path('', include(router.urls)),
    path('', include(accommodation_router.urls)),
    path('', include(user_router.urls)),

    path('rest-auth/', include('rest_auth.urls')),
    re_path(r'^api-token-auth/', views.CustomAuthToken.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
