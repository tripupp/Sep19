# Generated by Django 2.2.4 on 2019-09-02 11:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20190902_1503'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='city',
            field=models.CharField(max_length=500),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='country',
            field=models.CharField(max_length=500),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='state',
            field=models.CharField(max_length=500),
        ),
    ]
