from django.contrib import admin
from .models import City, Place


@admin.register(City)
class CityAdmin(admin.ModelAdmin):

    # fieldsets = (
    #     (None, {'fields': (
    #         'city_name',
    #         'state',
    #         'country',
    #         'weather',
    #         'ideal_month',
    #         'ideal_duration',
    #         'nearest_airport',
    #         'about',
    #     )}),
    # )
    list_display = ['city_id', 'city_name', 'slug', 'state', 'country']
    list_display_links = ['city_name']
    list_editable = []
    list_per_page = 10
    list_filter = []
    search_fields = ['city_id', 'city_name', 'state', 'country',
                     'nearest_airport']

    class Meta:
        model = City


@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):

    list_display = ['place_id', 'places', 'city', 'slug', 'state',
                    'country']
    list_display_links = ['places']
    list_editable = []
    list_per_page = 10
    list_filter = []
    search_fields = ['place_id', 'places', 'themes', 'city',
                     'state', 'country']

    class Meta:
        model = Place
