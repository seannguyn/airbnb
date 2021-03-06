# Generated by Django 2.1.1 on 2018-10-05 10:13

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_auto_20181005_0425'),
    ]

    operations = [
        migrations.CreateModel(
            name='ReviewCount',
            fields=[
                ('accommodation', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key='true', serialize=False, to='api.Accommodation')),
                ('count', models.IntegerField(default=0)),
            ],
        ),
        migrations.AlterField(
            model_name='accommodation',
            name='title',
            field=models.CharField(default=uuid.UUID('6463b438-af74-4072-98aa-8c4906bd6592'), max_length=100),
        ),
    ]
