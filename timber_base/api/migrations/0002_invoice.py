# Generated by Django 2.1.4 on 2019-12-14 23:58

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=100)),
                ('created_on', models.DateField(default=datetime.date.today)),
                ('total', models.FloatField()),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Customer')),
            ],
            options={
                'db_table': 'invoice',
                'ordering': ['id'],
            },
        ),
    ]