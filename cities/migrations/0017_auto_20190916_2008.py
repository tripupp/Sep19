# Generated by Django 2.2.4 on 2019-09-16 14:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cities', '0016_food_city'),
    ]

    operations = [
        migrations.RenameField(
            model_name='foodcuisine',
            old_name='cusine_name',
            new_name='cuisine_name',
        ),
    ]