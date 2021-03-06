# Generated by Django 2.1.1 on 2018-09-28 08:35

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_auto_20180928_0823'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accommodation',
            name='carpark',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='accommodation',
            name='gym',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='accommodation',
            name='kitchen',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='accommodation',
            name='pool',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='accommodation',
            name='title',
            field=models.CharField(default=uuid.UUID('1cd879f4-2f59-44a9-89c2-32c4b2a07fa8'), max_length=100),
        ),
    ]
