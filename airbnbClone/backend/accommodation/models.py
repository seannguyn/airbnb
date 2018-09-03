from django.db import models
from ..account.models import User

ACCOMMODATION_TYPES = (
    ('APARTMENT', 'Apartment'),
    ('HOUSE', 'House'),
    ('ROOM', 'Room'),
    ('STUDIO', 'Studio'),
    ('VILLA', 'Villa'),
)

CATEGORIES = (
    ('BASIC', 'Basic'),
    ('FACILITIES', 'Facilities'),
    ('DINING', 'Dining'),
    ('LOGISTICS', 'Logistic'),
    ('OUTDOORS', 'Outdoors'),
)


def image_dir(instance, filename):
    # file will be uploaded to MEDIA_ROOT/<accommodation_id>/<filename>
    return '{0}/{1}/{2}'.format('accommodations', instance.accommodation_id, filename)


class Amenity(models.Model):
    category = models.CharField(blank=False, max_length=20, choices=CATEGORIES)
    name = models.CharField(blank=False, max_length=20)


class Accommodation(models.Model):
    user = models.ForeignKey(User, related_name='accommodations', on_delete=models.CASCADE)

    type = models.CharField(blank=False, max_length=10, choices=ACCOMMODATION_TYPES)

    addr_number = models.PositiveIntegerField(blank=False)
    addr_street = models.CharField(blank=False, max_length=100)
    addr_city = models.CharField(blank=False, max_length=100)

    beds = models.IntegerField(default=1, blank=False)
    bedrooms = models.IntegerField(default=1, blank=False)
    bathrooms = models.IntegerField(default=1, blank=False)

    amenities = models.ManyToManyField(Amenity, through='AmenityDetail')


class AmenityDetail(models.Model):
    accommodation = models.ForeignKey(Accommodation, on_delete=models.CASCADE)
    amenity = models.ForeignKey(Amenity, on_delete=models.CASCADE)

    number = models.PositiveIntegerField(blank=False, default=1)


class AccommodationImage(models.Model):
    accommodation = models.ForeignKey(Accommodation, related_name="images", on_delete=models.CASCADE)

    height = models.PositiveIntegerField(default='500')
    width = models.PositiveIntegerField(default='500')
    image = models.ImageField(upload_to=image_dir, height_field='height', width_field='width')
