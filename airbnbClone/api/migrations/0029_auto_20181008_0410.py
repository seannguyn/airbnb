# Generated by Django 2.1.1 on 2018-10-08 04:10

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0028_auto_20181006_0739'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accommodation',
            name='title',
            field=models.CharField(default=uuid.UUID('8ba2ffa0-1519-4155-8d59-69a3faa99d5e'), max_length=100),
        ),
    ]
