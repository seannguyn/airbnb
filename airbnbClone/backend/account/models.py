from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


# Creates an Account instance whenever a User is created
@receiver(post_save, sender=User)
def create_account(sender, instance, created, **kwargs):
    if created:
        Account.objects.create(user=instance)


# Save a User's Account whenever there is a change or update
@receiver(post_save, sender=User)
def save_account(sender, instance, **kwargs):
    instance.account.save()


# file will be saved to MEDIA_ROOT/accounts/<username>
def image_dir(instance, filename):
    return '/'.join(['accounts', instance.user.username, filename])


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    height = models.PositiveIntegerField(default='500')
    width = models.PositiveIntegerField(default='500')
    image = models.ImageField(upload_to=image_dir, height_field='height', width_field='width')
