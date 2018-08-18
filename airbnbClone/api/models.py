from django.db import models
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from rest_framework import serializers
import datetime

# Create your models here.

class Accommodation(models.Model):

    ACCOMMODATION_TYPES = (
        ('Room', 'Room'),
        ('Studio', 'Studio'),
        ('Apartment', 'Apartment'),
        ('House', 'House'),
        ('Villa', 'Villa'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    Accomodation_Type = models.CharField(max_length=10, choices=ACCOMMODATION_TYPES)

    area            = models.IntegerField(default=1, blank=False)
    floors          = models.IntegerField(default=1, blank=False)
    bedroom_master  = models.IntegerField(default=1, blank=False)
    bedroom         = models.IntegerField(default=1, blank=False)
    kitchen         = models.IntegerField(default=1, blank=False)
    bathroom        = models.IntegerField(default=1, blank=False)

    pool            = models.IntegerField(default=0, blank=False)
    laundry         = models.IntegerField(default=0, blank=False)
    gym             = models.IntegerField(default=0, blank=False)
    entertainment   = models.IntegerField(default=0, blank=False)
    carpark         = models.IntegerField(default=0, blank=False)

    description     = models.TextField(blank=True)

    def __str__(self):
        return self.user.username + "_"+self.Accomodation_Type+"_" + str(self.id);

class AccommodationImage(models.Model):
    accommodation = models.ForeignKey(Accommodation, on_delete=models.CASCADE)
    url_height=models.PositiveIntegerField(default='500')
    url_width=models.PositiveIntegerField(default='500')
    a_image = models.ImageField(upload_to="accommodation/", height_field='url_height', width_field='url_width')

    def save(self, *args, **kwargs):
        # self.revision += 1
        return super(AccommodationImage, self).save(*args, **kwargs) #

class AccommodationHosting(models.Model):
    accommodation = models.OneToOneField(Accommodation, on_delete=models.CASCADE)
    date_start = models.DateField(default=datetime.datetime.today)
    date_end = models.DateField(default=datetime.datetime.today)
    price = models.PositiveIntegerField(blank=False)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.accommodation.__str__() + "_" + str(self.date_start) + "_" + str(self.date_end);


class AccommodationHostingArchive(models.Model):
    accommodation = models.ForeignKey(Accommodation, on_delete=models.CASCADE)
    date_start = models.DateField(default=datetime.datetime.today)
    date_end = models.DateField(default=datetime.datetime.today)
    price = models.PositiveIntegerField(blank=False)
    description = models.TextField(blank=True)

class Booking(models.Model):

    hosting = models.ForeignKey(AccommodationHosting, on_delete=models.CASCADE)
    booker = models.ForeignKey(User, on_delete=models.CASCADE)

    date_start = models.DateField(default=datetime.datetime.today)
    date_end = models.DateField(default=datetime.datetime.today)

    note  = models.TextField(blank=True)
