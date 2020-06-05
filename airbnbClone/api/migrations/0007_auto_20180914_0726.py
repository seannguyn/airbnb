# Generated by Django 2.0.5 on 2018-09-14 07:26

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20180912_1836'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='guest',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='booking',
            name='isPaid',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='accommodation',
            name='title',
            field=models.CharField(default=uuid.UUID('b24933a7-07f5-4d6f-aed6-ca3f7076a07e'), max_length=100),
        ),
    ]