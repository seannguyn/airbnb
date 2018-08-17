from django.contrib import admin
from api.models import Accommodation, AccommodationImage, AccommodationHosting, AccommodationHostingArchive
# Register your models here.

admin.site.register(Accommodation)
admin.site.register(AccommodationImage)
admin.site.register(AccommodationHosting)
admin.site.register(AccommodationHostingArchive)
