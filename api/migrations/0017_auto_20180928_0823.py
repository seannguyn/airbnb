# Generated by Django 2.1.1 on 2018-09-28 08:23

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_auto_20180927_1431'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='accommodation',
            name='area',
        ),
        migrations.RemoveField(
            model_name='accommodation',
            name='bedroom_master',
        ),
        migrations.AddField(
            model_name='accommodation',
            name='bed',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='accommodation',
            name='title',
            field=models.CharField(default=uuid.UUID('fe15bd31-6d14-435d-8d43-f4ed52cd6dc0'), max_length=100),
        ),
    ]
