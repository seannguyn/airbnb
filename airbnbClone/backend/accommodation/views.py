from rest_framework import viewsets

from .serializers import *


class AmenityViewSet(viewsets.ModelViewSet):
    queryset = Amenity.objects.all()
    serializer_class = AmenitySerializer


class AccommodationImageViewSet(viewsets.ModelViewSet):
    queryset = AccommodationImage.objects.all()
    serializer_class = AccommodationImageSerializer


class AccommodationViewSet(viewsets.ModelViewSet):
    queryset = Accommodation.objects.all()
    serializer_class = AccommodationSerializer
