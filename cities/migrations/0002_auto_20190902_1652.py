# Generated by Django 2.2.4 on 2019-09-02 11:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cities', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Places',
            new_name='Place',
        ),
        migrations.RenameField(
            model_name='city',
            old_name='ldeal_month',
            new_name='ideal_month',
        ),
    ]
