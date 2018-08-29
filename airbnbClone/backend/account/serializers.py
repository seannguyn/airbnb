from rest_framework import serializers

from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name',)


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('url', 'username',)


class ProfileImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileImage
        fields = ('id', 'height', 'width', 'image',)
