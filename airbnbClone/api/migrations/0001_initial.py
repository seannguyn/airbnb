# Generated by Django 2.0.5 on 2018-08-19 12:54

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
                ('Accomodation_Type', models.CharField(choices=[('Room', 'Room'), ('Studio', 'Studio'), ('Apartment', 'Apartment'), ('House', 'House'), ('Villa', 'Villa')], max_length=10)),
                ('addr_number', models.PositiveIntegerField(default=1)),
                ('addr_street', models.CharField(default='dedault', max_length=100)),
                ('addr_city', models.CharField(default='default', max_length=100)),
                ('addr_state', models.CharField(choices=[('NSW', 'NSW')], default='NSW', max_length=10)),
                ('area', models.IntegerField(default=1)),
                ('floors', models.IntegerField(default=1)),
                ('bedroom_master', models.IntegerField(default=1)),
                ('bedroom', models.IntegerField(default=1)),
                ('kitchen', models.IntegerField(default=1)),
                ('bathroom', models.IntegerField(default=1)),
                ('pool', models.IntegerField(default=0)),
                ('laundry', models.IntegerField(default=0)),
                ('gym', models.IntegerField(default=0)),
                ('entertainment', models.IntegerField(default=0)),
                ('carpark', models.IntegerField(default=0)),
                ('description', models.TextField(blank=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='AccommodationHosting',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_start', models.DateField(default=datetime.datetime.today)),
                ('date_end', models.DateField(default=datetime.datetime.today)),
                ('price', models.PositiveIntegerField()),
                ('description', models.TextField(blank=True)),
                ('accommodation', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.Accommodation')),
            ],
        ),
        migrations.CreateModel(
            name='AccommodationHostingArchive',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_start', models.DateField(default=datetime.datetime.today)),
                ('date_end', models.DateField(default=datetime.datetime.today)),
                ('price', models.PositiveIntegerField()),
                ('description', models.TextField(blank=True)),
                ('accommodation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Accommodation')),
            ],
        ),
        migrations.CreateModel(
            name='AccommodationImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url_height', models.PositiveIntegerField(default='500')),
                ('url_width', models.PositiveIntegerField(default='500')),
                ('a_image', models.ImageField(height_field='url_height', upload_to='accommodation/', width_field='url_width')),
                ('accommodation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Accommodation')),
            ],
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_start', models.DateField(default=datetime.datetime.today)),
                ('date_end', models.DateField(default=datetime.datetime.today)),
                ('note', models.TextField(blank=True)),
                ('booker', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('hosting', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.AccommodationHosting')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('star', models.CharField(choices=[('Very Bad', 0), ('Bad', 1), ('Ok', 2), ('Good', 3), ('Very Good', 4), ('Excellent', 5)], max_length=10)),
                ('review', models.TextField(blank=True)),
                ('accommodation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Accommodation')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', models.CharField(blank=True, max_length=30)),
                ('birth_date', models.DateField(blank=True, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]