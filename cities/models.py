from django.db import models


class City(models.Model):

    id = None
    city_id = models.BigAutoField(primary_key=True)
    city_name = models.CharField(max_length=500)
    # places_to_visit
    state = models.CharField(max_length=500)
    country = models.CharField(max_length=500)
    weather = models.CharField(max_length=500)
    ideal_month = models.CharField(max_length=100)
    ideal_duration = models.CharField(max_length=500)
    nearest_airport = models.CharField(max_length=500)
    # upcoming_events
    about = models.TextField()
    # more_on_city
    # articles
    # reviews
    # photos
    # videos
    # how_to_reach


class Place(models.Model):

    id = None
    place_id = models.BigAutoField(primary_key=True)
    places = models.CharField(max_length=500)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    state = models.CharField(max_length=500)
    country = models.CharField(max_length=500)
    description = models.TextField()
    themes = models.TextField()
    # faqs
    weather = models.CharField(max_length=500)
    time_required = models.CharField(max_length=500)
    timings = models.CharField(max_length=500)
    entry_fee = models.CharField(max_length=500)
    # reviews
    tripupp_opinion = models.TextField()
    # food
    # photos
    # videos
    map = models.TextField()
    # how_to_reach
    # articles
