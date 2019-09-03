# Generated by Django 2.2.4 on 2019-09-02 16:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cities', '0002_auto_20190902_1652'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='city',
            options={'verbose_name': 'city', 'verbose_name_plural': 'cities'},
        ),
        migrations.AlterModelOptions(
            name='place',
            options={'verbose_name': 'place', 'verbose_name_plural': 'places'},
        ),
        migrations.AddField(
            model_name='city',
            name='slug',
            field=models.SlugField(default='', editable=False, max_length=500),
        ),
        migrations.AddField(
            model_name='place',
            name='slug',
            field=models.SlugField(default='', editable=False, max_length=500),
        ),
    ]
