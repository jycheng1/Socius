# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-22 15:03
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('voices', '0010_auto_20160722_1102'),
    ]

    operations = [
        migrations.AlterField(
            model_name='request',
            name='satisfaction',
            field=models.CharField(blank=True, default='', max_length=50, null=True),
        ),
    ]