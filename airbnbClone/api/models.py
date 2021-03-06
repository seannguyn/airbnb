import datetime
import uuid

from django.contrib.auth.models import User
from django.db import models


# Create your models here.

ACCOMMODATION_TYPES = (
    ('Room', 'Room'),
    ('Studio', 'Studio'),
    ('Apartment', 'Apartment'),
    ('House', 'House'),
    ('Villa', 'Villa'),
)

class UserInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


class Accommodation(models.Model):

    STATES = (
        ('NSW', 'NSW'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    Accomodation_Type = models.CharField(max_length=10, choices=ACCOMMODATION_TYPES)

    title = models.CharField(blank=False, max_length=100, default=uuid.uuid4())

    address = models.CharField(blank=False, max_length=300, default='default address')
    latitude = models.FloatField(blank=False, default=1)
    longitude = models.FloatField(blank=False, default=1)

    bed = models.IntegerField(default=1, blank=False)
    bedroom = models.IntegerField(default=1, blank=False)
    bathroom = models.IntegerField(default=1, blank=False)

    kitchen = models.BooleanField(default=False, blank=False)
    gym = models.BooleanField(default=False, blank=False)
    pool = models.BooleanField(default=False, blank=False)
    carpark = models.BooleanField(default=False, blank=False)

    description = models.TextField(blank=True)

    def __str__(self):
        return self.user.username + "_" + self.Accomodation_Type + "_" + str(self.id)


class AccommodationImage(models.Model):
    accommodation = models.ForeignKey(Accommodation, on_delete=models.CASCADE)
    url_height = models.PositiveIntegerField(default='500')
    url_width = models.PositiveIntegerField(default='500')
    a_image = models.ImageField(upload_to="accommodation/", height_field='url_height', width_field='url_width')

    def save(self, *args, **kwargs):
        return super(AccommodationImage, self).save(*args, **kwargs)


class AccommodationHosting(models.Model):
    accommodation = models.OneToOneField(Accommodation, on_delete=models.CASCADE)
    date_start = models.DateField(default=datetime.datetime.today)
    date_end = models.DateField(default=datetime.datetime.today)
    guest = models.IntegerField(blank=False, default=1)
    check_in = models.TimeField(blank=True, default=datetime.time(14, 30, 0, 0))
    check_out = models.TimeField(blank=True, default=datetime.time(10, 0, 0, 0))
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
    isPaid = models.BooleanField(default=False)
    guest = models.IntegerField(blank=False, default=1)
    date_start = models.DateField(default=datetime.datetime.today)
    date_end = models.DateField(default=datetime.datetime.today)
    date_paymentDue = models.DateField(default=datetime.datetime.today)

    note = models.TextField(blank=True)


class Review(models.Model):
    SCALE = (
        (0, 0),
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5)
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    accommodation = models.ForeignKey(Accommodation, on_delete=models.CASCADE)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE)
    star = models.IntegerField(choices=SCALE)
    review = models.TextField(blank=True)
    date_posted = models.DateField(default=datetime.datetime.today, blank=True)


class Search(models.Model):
    accommodation = models.OneToOneField(Accommodation, on_delete=models.CASCADE, primary_key="true")
    date_free = models.TextField(blank=False)
    price = models.PositiveIntegerField(blank=False, default=100)
    guest = models.IntegerField(blank=False, default=1)
    location = models.CharField(blank=False, max_length=100, default='default')
    Accomodation_Type = models.CharField(blank=False, max_length=100, choices=ACCOMMODATION_TYPES, default="House")


class ReviewCount(models.Model):
    accommodation = models.OneToOneField(Accommodation, on_delete=models.CASCADE, primary_key="true")
    count = models.IntegerField(blank=False, default=0)


class BookRequest(models.Model):
    title = models.TextField(blank=False)
    date = models.TextField(blank=True)
    content = models.TextField(blank=False)
    sender = models.TextField(blank=True)
    toHost = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    hasReply = models.BooleanField(default=False)
    reply = models.TextField(blank=True)
