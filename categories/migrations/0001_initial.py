# Generated by Django 2.2.4 on 2019-09-02 18:08

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activities', models.CharField(choices=[('w', 'Water Sports'), ('t', 'Trekking'), ('s', 'Snow Sports'), ('e', 'Extreme Sports'), ('a', 'Adventures')], default='', max_length=30)),
                ('themes', models.CharField(choices=[('h', 'Honeymoon'), ('b', 'Beach'), ('bo', 'Boutique'), ('bu', 'Budget'), ('l', 'Luxury'), ('f', 'family')], default='', max_length=30)),
                ('days', models.CharField(choices=[('z', '0-2 Days'), ('th', '3-5 Days'), ('si', '6-9 Days'), ('m', 'More than 18')], default='', max_length=30)),
            ],
        ),
    ]
