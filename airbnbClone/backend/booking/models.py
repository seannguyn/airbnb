import datetime

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from ..accommodation.models import Accommodation
from ..account.models import User


@receiver(post_save, sender=Accommodation)
def create_listing(sender, instance, created, **kwargs):
    # Creates a Listing instance whenever an Accommodation is created
    if created:
        Listing.objects.create(accommodation=instance, host=instance.user)


class Listing(models.Model):
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    accommodation = models.OneToOneField(Accommodation, related_name='listing', on_delete=models.CASCADE)

    is_available = models.BooleanField(default=False)
    rate = models.PositiveIntegerField(blank=False, default=0)

    description = models.TextField(blank=True)


class Review(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)

    RATING = (
        (1, 'Bad'),
        (2, 'Ok'),
        (3, 'Good'),
        (4, 'Very Good'),
        (5, 'Excellent')
    )
    rating = models.CharField(max_length=10, choices=RATING)
    content = models.TextField(blank=True, max_length=300)


class Booking(models.Model):
    guest = models.ForeignKey(User, on_delete=models.CASCADE)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)

    date_start = models.DateField(default=datetime.datetime.today)
    date_end = models.DateField(default=datetime.datetime.today)

    note = models.TextField(blank=True)
