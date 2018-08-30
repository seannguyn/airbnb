from rest_framework import serializers

from .models import *


class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ('id', 'type')


class AccommodationImageSerializer(serializers.ModelSerializer):
    # might need this to show the url in the api instead of file path
    # image = serializers.ImageField(max_length=None, allow_empty_file=False, use_url=True)

    class Meta:
        model = AccommodationImage
        fields = ('id', 'accommodation', 'image')


class AccommodationSerializer(serializers.ModelSerializer):
    amenities = serializers.SlugRelatedField(many=True, read_only=True, allow_null=True, allow_empty=True, slug_field='type')
    images = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='track-list')

    class Meta:
        model = Accommodation
        fields = ('id', 'host', 'type',
                  'addr_number', 'addr_street', 'addr_city',
                  'beds', 'bedrooms', 'bathrooms',
                  'amenities', 'images')
