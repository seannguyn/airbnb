from rest_framework import serializers

from .models import *


class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ('id', 'category', 'name')


class AccommodationImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccommodationImage
        fields = ('id', 'accommodation', 'image')


class AccommodationSerializer(serializers.ModelSerializer):
    user = serializers.HyperlinkedRelatedField(queryset=User.objects.all(), view_name='user-detail')
    host = serializers.ReadOnlyField(source='user.username')
    amenities = serializers.PrimaryKeyRelatedField(many=True, queryset=Amenity.objects.all())

    class Meta:
        model = Accommodation
        fields = ('url', 'user', 'user_id', 'host', 'type',
                  'addr_number', 'addr_street', 'addr_city',
                  'beds', 'bedrooms', 'bathrooms',
                  'amenities', 'images')
