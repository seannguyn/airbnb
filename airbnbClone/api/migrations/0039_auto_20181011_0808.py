# Generated by Django 2.1.1 on 2018-10-11 08:08

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0038_auto_20181011_0808'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accommodation',
            name='title',
            field=models.CharField(default=uuid.UUID('101b5bf0-4e0d-4e59-9e00-84dff0477cbb'), max_length=100),
        ),
    ]