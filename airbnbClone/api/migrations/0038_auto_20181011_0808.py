# Generated by Django 2.1.1 on 2018-10-11 08:08

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0037_merge_20181011_0808'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accommodation',
            name='title',
            field=models.CharField(default=uuid.UUID('0db5f11d-39dc-4eaf-b9d0-d6ea61423dad'), max_length=100),
        ),
    ]