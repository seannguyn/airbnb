from django.db import models
from django.contrib.auth.models import User


class Amenity(models.Model):
    type = models.CharField(blank=False, max_length=20)

    class Meta:
        # verbose_name = 'amenity'
        verbose_name_plural = "amenities"


class AccommodationImage(models.Model):
    url_height = models.PositiveIntegerField(default='500')
    url_width = models.PositiveIntegerField(default='500')

    @staticmethod
    def get_image_dir(instance, filename):
        # file will be uploaded to MEDIA_ROOT/<accommodation_id>/<filename>
        return '{0}/{1}'.format(instance.accommodation_id, filename)

    image = models.ImageField(upload_to=get_image_dir, height_field='url_height', width_field='url_width')


class Accommodation(models.Model):
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

    amenities = models.ManyToManyField(Amenity)
    images = models.ForeignKey(AccommodationImage, on_delete=models.CASCADE)

