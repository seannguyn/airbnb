from django.contrib import admin
from api.models import Accommodation, AccommodationImage, AccommodationHosting, AccommodationHostingArchive, Booking, Review, Search
from rest_framework.authtoken.admin import TokenAdmin
# Register your models here.

admin.site.register(Accommodation)
admin.site.register(AccommodationImage)
admin.site.register(AccommodationHosting)
admin.site.register(AccommodationHostingArchive)
admin.site.register(Booking)
admin.site.register(Review)
admin.site.register(Search)

TokenAdmin.raw_id_fields = ('user',)
