# Generated by Django 2.1.1 on 2018-09-28 09:28

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_auto_20180928_0835'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accommodation',
            name='title',
            field=models.CharField(default=uuid.UUID('40b440fa-9fa7-44bc-857a-ce703d0f8434'), max_length=100),
        ),
    ]
