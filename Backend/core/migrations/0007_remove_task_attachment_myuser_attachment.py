# Generated by Django 5.2.3 on 2025-07-14 18:02

import core.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_rename_name_project_title'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='attachment',
        ),
        migrations.AddField(
            model_name='myuser',
            name='attachment',
            field=models.FileField(blank=True, null=True, upload_to=core.models.task_attachment_path),
        ),
    ]
