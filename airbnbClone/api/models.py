from django.db import models
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from rest_framework import serializers
import datetime

# Create your models here.

class UserInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

class Accommodation(models.Model):

    ACCOMMODATION_TYPES = (
        ('Room', 'Room'),
        ('Studio', 'Studio'),
        ('Apartment', 'Apartment'),
        ('House', 'House'),
        ('Villa', 'Villa'),
    )

    STATES = (
        ('NSW', 'NSW'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    Accomodation_Type = models.CharField(max_length=10, choices=ACCOMMODATION_TYPES)

    addr_number = models.PositiveIntegerField(blank=False, default=1)
    addr_street = models.CharField(blank=False, max_length=100,default='dedault')
    addr_city   = models.CharField(blank=False, max_length=100,default='default')
    addr_state  = models.CharField(max_length=10, choices=STATES,default='NSW')

    area            = models.IntegerField(default=1, blank=False)
    bedroom_master  = models.IntegerField(default=1, blank=False)
    bedroom         = models.IntegerField(default=1, blank=False)
    bathroom        = models.IntegerField(default=1, blank=False)
    kitchen         = models.IntegerField(default=1, blank=False)


    pool            = models.IntegerField(default=0, blank=False)
    gym             = models.IntegerField(default=0, blank=False)
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

class Review(models.Model):

    SCALE = (
        ('Very Bad', 0),
        ('Bad', 1),
        ('Ok', 2),
        ('Good',3),
        ('Very Good', 4),
        ('Excellent', 5)
        )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    accommodation = models.ForeignKey(Accommodation, on_delete=models.CASCADE)

    star = models.CharField(max_length=10, choices=SCALE)
    review = models.TextField(blank=True)
