# Generated by Django 2.1 on 2018-09-03 11:04

import backend.accommodation.models
import backend.account.models
import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Accommodation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('APARTMENT', 'Apartment'), ('HOUSE', 'House'), ('ROOM', 'Room'), ('STUDIO', 'Studio'), ('VILLA', 'Villa')], max_length=10)),
                ('addr_number', models.PositiveIntegerField()),
                ('addr_street', models.CharField(max_length=100)),
                ('addr_city', models.CharField(max_length=100)),
                ('beds', models.IntegerField(default=1)),
                ('bedrooms', models.IntegerField(default=1)),
                ('bathrooms', models.IntegerField(default=1)),
            ],
        ),
        migrations.CreateModel(
            name='AccommodationImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('height', models.PositiveIntegerField(default='500')),
                ('width', models.PositiveIntegerField(default='500')),
                ('image', models.ImageField(height_field='height', upload_to=backend.accommodation.models.image_dir, width_field='width')),
                ('accommodation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='backend.Accommodation')),
            ],
        ),
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('height', models.PositiveIntegerField(default='500')),
                ('width', models.PositiveIntegerField(default='500')),
                ('image', models.ImageField(height_field='height', upload_to=backend.account.models.image_dir, width_field='width')),
                ('user', models.OneToOneField(editable=False, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Amenity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(choices=[('BASIC', 'Basic'), ('FACILITIES', 'Facilities'), ('DINING', 'Dining'), ('LOGISTICS', 'Logistic'), ('OUTDOORS', 'Outdoors')], max_length=20)),
                ('name', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='AmenityDetail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.PositiveIntegerField(default=1)),
                ('accommodation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Accommodation')),
                ('amenity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Amenity')),
            ],
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_start', models.DateField(default=datetime.datetime.today)),
                ('date_end', models.DateField(default=datetime.datetime.today)),
                ('note', models.TextField(blank=True)),
                ('guest', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_available', models.BooleanField(default=False)),
                ('rate', models.PositiveIntegerField(default=0)),
                ('description', models.TextField(blank=True)),
                ('accommodation', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='listing', to='backend.Accommodation')),
                ('host', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.CharField(choices=[(1, 'Bad'), (2, 'Ok'), (3, 'Good'), (4, 'Very Good'), (5, 'Excellent')], max_length=10)),
                ('content', models.TextField(blank=True, max_length=300)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('listing', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Listing')),
            ],
        ),
        migrations.AddField(
            model_name='booking',
            name='listing',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Listing'),
        ),
        migrations.AddField(
            model_name='accommodation',
            name='amenities',
            field=models.ManyToManyField(through='backend.AmenityDetail', to='backend.Amenity'),
        ),
        migrations.AddField(
            model_name='accommodation',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='accommodations', to=settings.AUTH_USER_MODEL),
        ),
    ]
