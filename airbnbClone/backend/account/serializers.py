from rest_framework import serializers

from ..serializers import NonNullModelSerializer
from .models import User, Account


class UserSerializer(serializers.HyperlinkedModelSerializer, NonNullModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'accommodations')


class AccountSerializer(serializers.HyperlinkedModelSerializer):
    username = serializers.CharField(read_only=True, source='user.username')
    image = serializers.ImageField()

    class Meta:
        model = Account
        fields = ('url', 'user', 'username', 'image',)
