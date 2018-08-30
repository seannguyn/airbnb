from rest_framework import serializers

from .models import User, Account
from ..booking.models import Listing, Booking, Review


class UserSerializer(serializers.ModelSerializer):
    listings = serializers.PrimaryKeyRelatedField(many=True, queryset=Listing.objects.all())
    bookings = serializers.PrimaryKeyRelatedField(many=True, queryset=Booking.objects.all())
    reviews = serializers.PrimaryKeyRelatedField(many=True, queryset=Review.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'listings', 'bookings', 'reviews')


class AccountSerializer(serializers.HyperlinkedModelSerializer):
    username = serializers.CharField(read_only=True, source='user.username')

    class Meta:
        model = Account
        fields = ('user', 'username', 'image',)
