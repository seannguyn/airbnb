# Generated by Django 2.1.1 on 2018-10-20 15:15

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0043_auto_20181021_0215'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accommodation',
            name='title',
            field=models.CharField(default=uuid.UUID('0cbecdc6-5189-4de4-a6d6-bb33334ae654'), max_length=100),
        ),
    ]
