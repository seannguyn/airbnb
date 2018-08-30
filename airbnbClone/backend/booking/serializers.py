from rest_framework import serializers

from .models import *


class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True, source='author.username')

    class Meta:
        model = Review
        fields = ('id', 'author', 'username', 'listing', 'rating', 'content')


class BookingSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True, source='guest.username')

    class Meta:
        model = Booking
        fields = ('id', 'listing', 'guest', 'username', 'date_start', 'date_end', 'note')

    def validate(self, data):
        # Check that the start date is before the end date.
        if data['date_start'] > data['date_end']:
            raise serializers.ValidationError("end date must occur after start date")
        return data


class ListingSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True, source='host.username')
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Listing
        fields = ('id', 'host', 'username', 'accommodation', 'rate', 'description', 'reviews')
