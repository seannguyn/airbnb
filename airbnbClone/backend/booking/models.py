import datetime

from django.db import models
from ..accommodation.models import Accommodation
from ..account.models import Account


class Listing(models.Model):
    host = models.ForeignKey(Account, on_delete=models.CASCADE)

    accommodation = models.ForeignKey(Accommodation, on_delete=models.CASCADE)
    rate = models.PositiveIntegerField(blank=False)

    description = models.TextField(blank=True)


class Review(models.Model):
    RATING = (
        ('Bad', 1),
        ('Ok', 2),
        ('Good', 3),
        ('Very Good', 4),
        ('Excellent', 5)
    )

    author = models.ForeignKey(Account, on_delete=models.CASCADE)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)

    rating = models.CharField(max_length=10, choices=RATING)
    review = models.TextField(blank=True)


class Booking(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    guest = models.ForeignKey(Account, on_delete=models.CASCADE)

    date_start = models.DateField(default=datetime.datetime.today)
    date_end = models.DateField(default=datetime.datetime.today)

    note = models.TextField(blank=True)
