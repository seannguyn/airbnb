# Generated by Django 2.1.1 on 2018-09-27 18:24

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_merge_20180927_0819'),
    ]

    operations = [
        migrations.AddField(
            model_name='accommodation',
            name='address',
            field=models.CharField(default='default address', max_length=300),
        ),
        migrations.AddField(
            model_name='accommodation',
            name='latitude',
            field=models.FloatField(default=1),
        ),
        migrations.AddField(
            model_name='accommodation',
            name='longitude',
            field=models.FloatField(default=1),
        ),
        migrations.AlterField(
            model_name='accommodation',
            name='title',
            field=models.CharField(default=uuid.UUID('05ca142c-9a3c-4abe-8fee-584666169922'), max_length=100),
        ),
        migrations.AlterField(
            model_name='review',
            name='booking',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Booking'),
        ),
    ]
