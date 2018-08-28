import datetime

from django.db import models
from django.contrib.auth.models import User

from ..accommodation.models import Accommodation


class Review(models.Model):
    RATING = (
        ('Bad', 1),
        ('Ok', 2),
        ('Good', 3),
        ('Very Good', 4),
        ('Excellent', 5)
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    accommodation = models.ForeignKey(Accommodation, on_delete=models.CASCADE)

    star = models.CharField(max_length=10, choices=SCALE)
    review = models.TextField(blank=True)


class Listing(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    accommodation = models.ForeignKey(Accommodation, on_delete=models.CASCADE)
    rate = models.PositiveIntegerField(blank=False)

    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "listings"


class Booking(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    booker = models.ForeignKey(User, on_delete=models.CASCADE)

    date_start = models.DateField(default=datetime.datetime.today)
    date_end = models.DateField(default=datetime.datetime.today)

    note = models.TextField(blank=True)


