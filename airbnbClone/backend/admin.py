from django.contrib import admin
from rest_framework.authtoken.admin import TokenAdmin

from .account.models import *
from .accommodation.models import *
from .booking.models import *


# Register your models here.

# Account models
admin.site.register(Account)
admin.site.register(ProfileImage)

# Accommodation models
admin.site.register(Amenity)
admin.site.register(Accommodation)
admin.site.register(AccommodationImage)

# Booking models
admin.site.register(Listing)
admin.site.register(Review)

TokenAdmin.raw_id_fields = ('user',)