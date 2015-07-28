# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('data_storage', '0002_auto_20150727_2312'),
    ]

    operations = [
        migrations.RenameField(
            model_name='readonly',
            old_name='state',
            new_name='stateAbbreviation',
        ),
        migrations.RenameField(
            model_name='writeonly',
            old_name='state',
            new_name='stateAbbreviation',
        ),
        migrations.AddField(
            model_name='readonly',
            name='stateName',
            field=models.TextField(default='sexy jens'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='writeonly',
            name='stateName',
            field=models.TextField(default='sexy cindy'),
            preserve_default=False,
        ),
    ]
