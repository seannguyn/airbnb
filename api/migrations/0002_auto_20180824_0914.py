# Generated by Django 2.0.5 on 2018-08-24 09:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='accommodation',
            name='entertainment',
        ),
        migrations.RemoveField(
            model_name='accommodation',
            name='floors',
        ),
        migrations.RemoveField(
            model_name='accommodation',
            name='laundry',
        ),
        migrations.RemoveField(
            model_name='userinfo',
            name='birth_date',
        ),
        migrations.RemoveField(
            model_name='userinfo',
            name='location',
        ),
        migrations.AlterField(
            model_name='accommodation',
            name='id',
            field=models.CharField(editable=False, max_length=100, primary_key=True, serialize=False),
        ),
    ]