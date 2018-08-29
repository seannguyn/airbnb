from django.db import models
from django.contrib.auth.models import User


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class ProfileImage(models.Model):
    account = models.ForeignKey(Account, related_name='image', on_delete=models.CASCADE)

    height = models.PositiveIntegerField(default='500')
    width = models.PositiveIntegerField(default='500')

    @staticmethod
    def image_dir(instance, filename):
        return 'accounts/'.join([instance.user.username, filename])

    # file will be saved to MEDIA_ROOT/accounts/<username>
    image = models.ImageField(upload_to=image_dir, height_field='url_height', width_field='url_width')
