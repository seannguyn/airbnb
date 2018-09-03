from rest_framework import viewsets
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from .serializers import *


class AmenityViewSet(viewsets.ModelViewSet):
    queryset = Amenity.objects.all()
    serializer_class = AmenitySerializer


class AccommodationImageViewSet(viewsets.ModelViewSet):
    queryset = AccommodationImage.objects.all()
    serializer_class = AccommodationImageSerializer


# @permission_classes(TokenAuthentication,)
@permission_classes((IsAuthenticated,))
class AccommodationViewSet(viewsets.ModelViewSet):
    queryset = Accommodation.objects.all()
    serializer_class = AccommodationSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
