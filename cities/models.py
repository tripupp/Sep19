import os
import datetime
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.urls import reverse
from django.utils.text import slugify


class Theme(models.Model):

    theme_name = models.CharField(max_length=500)
    slug = models.SlugField(
        default='',
        editable=False,
        max_length=500,
    )

    def get_absolute_url(self):
        kwargs = {
            'pk': self.pk,
            'slug': self.slug
        }
        return reverse('city-pk-slug-detail', kwargs=kwargs)

    def save(self, *args, **kwargs):
        value = self.theme_name
        self.slug = slugify(value, allow_unicode=True)
        super().save(*args, **kwargs)

    class Meta:

        verbose_name = _('Theme')
        verbose_name_plural = _('Themes')

    def __str__(self):
        return self.theme_name


class IdealMonth(models.Model):

    month_name = models.CharField(max_length=20)
    month_number = models.IntegerField()

    def __str__(self):
        return self.month_name

class Activities(models.Model):

    activity_name = models.CharField(max_length=500)

    def __str__(self):
        return self.activity_name

class City(models.Model):

    def city_pic_path(self, filename):

        if filename != 'nophoto.jpg':
            basefilename, file_extension = os.path.splitext(filename)
            randomstr = datetime.datetime.now().strftime('%d-%m-%Y_%I:%M:%S,%f')
            return 'city_pics/{city_id}/{basename}_{randomstring}{ext}'.format(
                city_id=self.city_id, basename=basefilename, randomstring=randomstr,
                ext=file_extension)

    region_choices = [
        ('North India', 'North India'),
        ('South India', 'South India'),
        ('East India', 'East India'),
        ('West India', 'West India'),
        ('Central India', 'Central India'),
        ('North-East', 'North-East'),
        ('International', 'International')
    ]

    id = None
    city_id = models.BigAutoField(primary_key=True)
    city_name = models.CharField(max_length=500)
    # places_to_visit
    state = models.CharField(max_length=500)
    country = models.CharField(max_length=500)
    weather = models.CharField(max_length=500)
    ideal_month = models.ManyToManyField(IdealMonth)
    ideal_duration = models.IntegerField()
    nearest_airport = models.CharField(max_length=500)
    # upcoming_events
    about = models.TextField()
    city_pic = models.ImageField(default='nophoto.jpg',
                                 upload_to=city_pic_path)
    # more_on_city
    # articles
    # reviews
    # photos
    # videos
    # how_to_reach
    slug = models.SlugField(
        default='',
        editable=False,
        max_length=500,
    )
    themes = models.ManyToManyField(Theme)
    region = models.CharField(max_length=500, choices=region_choices)
    is_top_destination = models.BooleanField()

    def get_absolute_url(self):
        kwargs = {
            'pk': self.city_id,
            'slug': self.slug
        }
        return reverse('city-pk-slug-detail', kwargs=kwargs)

    def save(self, *args, **kwargs):
        value = self.city_name
        self.slug = slugify(value, allow_unicode=True)
        super().save(*args, **kwargs)

    class Meta:

        verbose_name = _('city')
        verbose_name_plural = _('cities')

    def __str__(self):
        return self.city_name


class Place(models.Model):

    def place_pic_path(self, filename):

        if filename != 'nophoto.jpg':
            basefilename, file_extension = os.path.splitext(filename)
            randomstr = datetime.datetime.now().strftime('%d-%m-%Y_%I:%M:%S,%f')
            return 'place_pics/{place_id}/{basename}_{randomstring}{ext}'.format(
                place_id=self.place_id, basename=basefilename, randomstring=randomstr,
                ext=file_extension)

    id = None
    place_id = models.BigAutoField(primary_key=True)
    places = models.CharField(max_length=500)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    state = models.CharField(max_length=500)
    country = models.CharField(max_length=500)
    description = models.TextField()
    # themes = models.TextField()
    themes = models.ManyToManyField(Theme)
    # faqs
    weather = models.CharField(max_length=500)
    time_required = models.CharField(max_length=500)
    timings = models.CharField(max_length=500)
    entry_fee = models.CharField(max_length=500)
    place_pic = models.ImageField(default='nophoto.jpg',
                                 upload_to=place_pic_path)
    # reviews
    tripupp_opinion = models.TextField()
    # food
    # photos
    # videos
    map = models.TextField()
    # how_to_reach
    # articles

    slug = models.SlugField(
        default='',
        editable=False,
        max_length=500,
    )

    activities = models.ManyToManyField(Activities)
    
    def get_absolute_url(self):
        kwargs = {
            'pk': self.id,
            'slug': self.slug
        }
        return reverse('place-pk-slug-detail', kwargs=kwargs)

    def save(self, *args, **kwargs):
        value = self.places
        self.slug = slugify(value, allow_unicode=True)
        super().save(*args, **kwargs)

    class Meta:

        verbose_name = _('place')
        verbose_name_plural = _('places')

    def __str__(self):
        return self.places


class FoodCuisine(models.Model):

    cuisine_name = models.CharField(max_length=500)

    def __str__(self):
        return self.cuisine_name


class FoodMeal(models.Model):

    meal_name = models.CharField(max_length=500)

    def __str__(self):
        return self.meal_name


class FoodFeatures(models.Model):

    feature_name = models.CharField(max_length=500)

    def __str__(self):
        return self.feature_name


class FoodDietaryTypes(models.Model):

    dietary_type_name = models.CharField(max_length=500)

    def __str__(self):
        return self.dietary_type_name


class Food(models.Model):

    def food_pic_path(self, filename):

        if filename != 'nophoto.jpg':
            basefilename, file_extension = os.path.splitext(filename)
            randomstr = datetime.datetime.now().strftime('%d-%m-%Y_%I:%M:%S,%f')
            return 'food_pics/{id}/{basename}_{randomstring}{ext}'.format(
                id=self.pk, basename=basefilename, randomstring=randomstr,
                ext=file_extension)

    name = models.CharField(max_length=500)
    cuisine = models.ManyToManyField(FoodCuisine)
    duration_from = models.TimeField()
    duration_to = models.TimeField()
    meal = models.ManyToManyField(FoodMeal)
    features = models.ManyToManyField(FoodFeatures)
    reach_us = models.TextField()
    dietary_types = models.ManyToManyField(FoodDietaryTypes)
    minimum_price = models.FloatField()
    maximum_price = models.FloatField()
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    food_pic = models.ImageField(default='nophoto.jpg',
                                 upload_to=food_pic_path)

    def __str__(self):
        return self.name


class HotelFacility(models.Model):

    facility_name = models.CharField(max_length=500)

    def __str__(self):
        return self.facility_name


class Hotel(models.Model):

    def hotel_pic_path(self, filename):

        if filename != 'nophoto.jpg':
            basefilename, file_extension = os.path.splitext(filename)
            randomstr = datetime.datetime.now().strftime('%d-%m-%Y_%I:%M:%S,%f')
            return 'hotel_pics/{id}/{basename}_{randomstring}{ext}'.format(
                id=self.pk, basename=basefilename, randomstring=randomstr,
                ext=file_extension)

    name = models.CharField(max_length=500)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    state = models.CharField(max_length=500)
    price = models.FloatField()
    star_ratings = models.IntegerField(choices=[
                                            (1, 'Budget Hotels'),
                                            (2, '2 Star Hotels'),
                                            (3, '3 Star Hotels'),
                                            (4, '4 Star Hotels'),
                                            (5, '5 Star Hotels')
                                            ]
                                    )
    facilities = models.ManyToManyField(HotelFacility)
    hotel_type = models.CharField(max_length=500, choices=[
                                            ('Apartments', 'Apartments'),
                                            ('Residences', 'Residences'),
                                            ('Farm stays', 'Farm stays'),
                                            ('Resorts', 'Resorts'),
                                            ('Hostels', 'Hostels')
                                        ]
                                  )
    hotel_pic = models.ImageField(default='nophoto.jpg',
                                 upload_to=hotel_pic_path)

    def __str__(self):
        return self.name


class Package(models.Model):

    def package_pic_path(self, filename):

        if filename != 'nophoto.jpg':
            basefilename, file_extension = os.path.splitext(filename)
            randomstr = datetime.datetime.now().strftime('%d-%m-%Y_%I:%M:%S,%f')
            return 'package_pics/{id}/{basename}_{randomstring}{ext}'.format(
                id=self.pk, basename=basefilename, randomstring=randomstr,
                ext=file_extension)

    name = models.CharField(max_length=500)
    duration = models.IntegerField()
    price = models.FloatField()
    hotel = models.ManyToManyField(Hotel)
    city = models.ManyToManyField(City)
    theme = models.ManyToManyField(Theme)
    star_ratings = models.IntegerField()
    package_pic = models.ImageField(default='nophoto.jpg',
                                 upload_to=package_pic_path)

    def __str__(self):
        return self.name


class photos(models.Model):

    def photo_pic_path(self, filename):

        if filename != 'nophoto.jpg':
            basefilename, file_extension = os.path.splitext(filename)
            randomstr = datetime.datetime.now().strftime('%d-%m-%Y_%I:%M:%S,%f')
            return 'photo_pics/{id}/{basename}_{randomstring}{ext}'.format(
                id=self.city.pk, basename=basefilename, randomstring=randomstr,
                ext=file_extension)

    pic = models.ImageField(default='nophoto.jpg',
                                 upload_to=photo_pic_path)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    theme = models.ForeignKey(Theme, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.city.city_name
