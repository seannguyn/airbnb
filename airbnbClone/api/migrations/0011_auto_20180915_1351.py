# Generated by Django 2.1 on 2018-09-15 13:51

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_merge_20180915_1350'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accommodation',
            name='title',
            field=models.CharField(default=uuid.UUID('c719a682-ad14-43f0-8492-4e677e99b5f3'), max_length=100),
        ),
        migrations.AlterField(
            model_name='review',
            name='booking',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Booking'),
        ),
    ]