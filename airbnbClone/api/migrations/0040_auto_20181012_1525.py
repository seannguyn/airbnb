# Generated by Django 2.1.1 on 2018-10-12 04:25

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0039_auto_20181011_0808'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accommodation',
            name='title',
            field=models.CharField(default=uuid.UUID('25201df5-63cb-4a4c-9672-feae0f4a13a7'), max_length=100),
        ),
    ]
