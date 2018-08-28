from django.db import models
from django.contrib.auth.models import User


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    class Meta:
        # verbose_name = 'account'
        verbose_name_plural = 'accounts'


class ProfileImage(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)

    height = models.PositiveIntegerField(default='500')
    width = models.PositiveIntegerField(default='500')

    # file will be saved to MEDIA_ROOT/accounts/<username>
    save_dir = 'accounts/' + account.user.username
    image = models.ImageField(upload_to=save_dir, height_field='url_height', width_field='url_width')
