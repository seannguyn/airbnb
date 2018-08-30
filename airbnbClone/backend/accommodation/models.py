from django.db import models
from ..account.models import User


def image_dir(instance, filename):
    # file will be uploaded to MEDIA_ROOT/<accommodation_id>/<filename>
    return '{0}/{1}'.format(instance.accommodation_id, filename)


class Accommodation(models.Model):
    host = models.ForeignKey(User, on_delete=models.CASCADE)

    ACCOMMODATION_TYPES = (
        ('APARTMENT', 'Apartment'),
        ('HOUSE', 'House'),
        ('ROOM', 'Room'),
        ('STUDIO', 'Studio'),
        ('VILLA', 'Villa'),
    )
    type = models.CharField(blank=False, max_length=10, choices=ACCOMMODATION_TYPES)

    addr_number = models.PositiveIntegerField(blank=False)
    addr_street = models.CharField(blank=False, max_length=100)
    addr_city = models.CharField(blank=False, max_length=100)

    beds = models.IntegerField(default=1, blank=False)
    bedrooms = models.IntegerField(default=1, blank=False)
    bathrooms = models.IntegerField(default=1, blank=False)


class Amenity(models.Model):
    accommodation = models.ManyToManyField(Accommodation)

    type = models.CharField(blank=False, max_length=20)

    class Meta:
        # verbose_name = 'amenity'
        verbose_name_plural = "amenities"


class AccommodationImage(models.Model):
    accommodation = models.ForeignKey(Accommodation, related_name="images", on_delete=models.CASCADE)

    height = models.PositiveIntegerField(default='500')
    width = models.PositiveIntegerField(default='500')
    image = models.ImageField(upload_to=image_dir, height_field='url_height', width_field='url_width')
