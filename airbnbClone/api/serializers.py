from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from api.models import Accommodation, AccommodationImage, AccommodationHosting, Booking, Review, UserInfo, Search, ReviewCount, BookRequest
from pymongo import MongoClient
import smtplib


# set up mongodb
MONGODB_URI = "mongodb://comp3900:comp3900@ds125293.mlab.com:25293/comp3900"
client = MongoClient(MONGODB_URI, connectTimeoutMS=30000)
db = client.get_database("comp3900")

class AccommodationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Accommodation
        fields = ('id','user','title', 'address', 'latitude', 'longitude',
                    'Accomodation_Type','bed','bedroom',
                    'kitchen','bathroom','pool',
                    'gym','carpark','description')

class AccommodationImageSerializer(serializers.ModelSerializer):

    a_image = serializers.ImageField(max_length=None, allow_empty_file=False, use_url=True)

    class Meta:
        model = AccommodationImage
        fields = ('id','accommodation','url_height','url_width','a_image')
    def create(self, validated_data):
        return AccommodationImage.objects.create(**validated_data)

class AccommodationHostingSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccommodationHosting
        fields = ('id', 'accommodation','date_start','date_end','check_in','check_out','price','guest','description')

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('id','isPaid','guest','hosting','booker','date_start','date_end','date_paymentDue','note')

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'user', 'accommodation', 'booking', 'star', 'review', 'date_posted')

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ('id', 'user')

class SearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Search
        fields = ('accommodation', 'date_free', 'price', 'guest', 'location')

class ReviewCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewCount
        fields = ('accommodation', 'count')

class BookRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookRequest
        fields = '__all__'

    def update(self, instance, validated_data):

        instance.id = validated_data.get('id', instance.id)
        instance.title = validated_data.get('title', instance.title)
        instance.date = validated_data.get('date', instance.date)
        instance.content = validated_data.get('content', instance.content)
        instance.sender = validated_data.get('sender', instance.sender)
        instance.hasReply = validated_data.get('hasReply', instance.hasReply)
        instance.reply = validated_data.get('reply', instance.reply)
        instance.toHost = validated_data.get('toHost', instance.toHost)

        # EMAIL SENDING
        systemEmail = db['portBnB'].find_one( { "email" : "comp3900project3@gmail.com" } )
        officialTitle ="Re portBnB: " + instance.title
        message = 'Subject: {}\n\n{}'.format(officialTitle, instance.reply)

        # Login email
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(systemEmail['email'], systemEmail['password'])

        server.sendmail(systemEmail['email'], instance.sender, message)
        server.quit()

        instance.save()

        return instance
