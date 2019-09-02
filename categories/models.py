from django.db import models


from cities.models import City,Place

# Create your models here.
class Category(models.Model):

	act =  (

				('w', 'Water Sports'),
				('t', 'Trekking'),

				('s', 'Snow Sports'),
				('e', 'Extreme Sports'),
				('a', 'Adventures'),
			)
	theme =  (

				('h', 'Honeymoon'),
				('b', 'Beach'),

				('bo', 'Boutique'),
				('bu', 'Budget'),
				('l', 'Luxury'),
				('f','family'),
			)
	day =	(
				('z','0-2 Days'),
				('th','3-5 Days'),
				('si','6-9 Days'),
				('m','More than 18'),
		)

	activities = models.CharField(max_length=30 ,choices = act, default="")
	themes = models.CharField(max_length=30 ,choices = theme, default="")
	days = models.CharField(max_length=30 ,choices = day, default="")