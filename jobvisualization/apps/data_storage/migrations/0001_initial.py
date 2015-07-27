# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ReadOnly',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('num_jobs', models.IntegerField()),
                ('city_name', models.TextField()),
                ('state_abbr', models.TextField()),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('job_title', models.TextField()),
                ('created_at', models.DateField()),
            ],
            options={
                'db_table': 'ReadOnly',
            },
        ),
        migrations.CreateModel(
            name='WriteOnly',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('num_jobs', models.IntegerField()),
                ('city_name', models.TextField()),
                ('state_abbr', models.TextField()),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('job_title', models.TextField()),
                ('created_at', models.DateField()),
            ],
            options={
                'db_table': 'WriteOnly',
            },
        ),
    ]
