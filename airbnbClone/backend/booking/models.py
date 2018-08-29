import datetime

from django.db import models
from ..accommodation.models import Accommodation
from ..account.models import User


class Listing(models.Model):
    host = models.ForeignKey(User, on_delete=models.CASCADE)

    accommodation = models.ForeignKey(Accommodation, on_delete=models.CASCADE)
    rate = models.PositiveIntegerField(blank=False)

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
    review = models.TextField(blank=True, max_length=300)


class Booking(models.Model):
    guest = models.ForeignKey(User, on_delete=models.CASCADE)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)

    date_start = models.DateField(default=datetime.datetime.today)
    date_end = models.DateField(default=datetime.datetime.today)

    note = models.TextField(blank=True)
