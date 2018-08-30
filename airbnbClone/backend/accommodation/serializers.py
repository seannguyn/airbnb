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
    user = serializers.HyperlinkedRelatedField(queryset=User.objects.all(), view_name='user-detail')
    host = serializers.ReadOnlyField(source='user.username')
    amenities = serializers.SlugRelatedField(
        many=True,
        queryset=Amenity.objects.all(),
        slug_field='type'
     )

    class Meta:
        model = Accommodation
        fields = ('url', 'user', 'user_id', 'host', 'type',
                  'addr_number', 'addr_street', 'addr_city',
                  'beds', 'bedrooms', 'bathrooms',
                  'amenities', 'images')
