# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('data_storage', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='readonly',
            old_name='state_abbr',
            new_name='state',
        ),
        migrations.RenameField(
            model_name='writeonly',
            old_name='state_abbr',
            new_name='state',
        ),
    ]
