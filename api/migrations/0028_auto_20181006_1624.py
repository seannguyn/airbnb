# Generated by Django 2.1.1 on 2018-10-06 16:24

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0027_auto_20181006_1619'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bookrequest',
            name='toHost',
        ),
        migrations.AlterField(
            model_name='accommodation',
            name='title',
            field=models.CharField(default=uuid.UUID('f85672af-8636-41ae-9101-96d7014cf6c1'), max_length=100),
        ),
    ]
