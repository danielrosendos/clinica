from __future__ import unicode_literals
from django.db import migrations, models
from django.contrib.auth.models import User  


def forwards_func(apps, schema_editor):
    User.objects.create_superuser('admin', 'admin')


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_consulta'),
    ]

    operations = [
        migrations.RunPython(forwards_func),
    ]