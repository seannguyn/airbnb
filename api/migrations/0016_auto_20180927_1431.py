# Generated by Django 2.1.1 on 2018-09-27 14:31

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_merge_20180927_1431'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accommodation',
            name='title',
            field=models.CharField(default=uuid.UUID('31d43049-857c-4ff4-bd91-b34a85e5bdf4'), max_length=100),
        ),
    ]
