from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from api.models import Accommodation, AccommodationImage, AccommodationHosting, Booking

class AccommodationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Accommodation
        fields = ('id','user','Accomodation_Type','area','floors','bedroom_master','bedroom',
                    'kitchen','bathroom','pool',
                    'laundry','gym','entertainment','carpark','description')

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
        fields = ('accommodation','date_start','date_end','price','description')

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('id','hosting','booker','date_start','date_end','note')
