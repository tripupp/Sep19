# Generated by Django 2.2.4 on 2019-09-04 08:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cities', '0006_auto_20190904_1009'),
    ]

    operations = [
        migrations.AddField(
            model_name='city',
            name='themes',
            field=models.ManyToManyField(to='cities.Theme'),
        ),
    ]
