from django.db import models
from django.contrib.auth.models import User


class Account(models.Model):
    type = models.CharField(blank=False, max_length=20)

    class Meta:
        # verbose_name = 'amenity'
        verbose_name_plural = "accounts"
