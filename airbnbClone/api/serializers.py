from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from api.models import Accommodation, AccommodationImage, AccommodationHosting, Booking, Review, UserInfo

class AccommodationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Accommodation
        fields = ('id','user','title',
                    'addr_number','addr_street','addr_city','addr_state',
                    'Accomodation_Type','area','bedroom_master','bedroom',
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
        fields = ('id', 'accommodation','date_start','date_end','check_in','check_out','price','description')

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('id','isPaid','guest','hosting','booker','date_start','date_end','date_paymentDue','note')

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'user', 'accommodation', 'star', 'review', 'date_posted')

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ('id', 'user')
