from rest_framework import serializers

from .models import *


class ListingSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True, source='host.user.username')

    class Meta:
        model = Listing
        fields = ('id', 'host', 'username', 'accommodation', 'rate', 'description', 'reviews')


class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True, source='author.username')

    class Meta:
        model = Review
        fields = ('id', 'author', 'username', 'listing', 'rating', 'review')


class BookingSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True, source='guest.username')

    class Meta:
        model = Booking
        fields = ('id', 'listing', 'guest', 'username', 'date_start', 'date_end', 'note')
