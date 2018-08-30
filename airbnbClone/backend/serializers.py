from rest_framework import serializers
from collections import OrderedDict


class NonNullModelSerializer(serializers.ModelSerializer):
    """
    Filters and hides null or empty fields
    """
    def to_representation(self, instance):
        ret = super(NonNullModelSerializer, self).to_representation(instance)
        return OrderedDict(list(filter(lambda x: x[1], ret.items())))