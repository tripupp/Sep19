from django.shortcuts import render, get_object_or_404
from django.urls import reverse_lazy
from django.views import View
from .models import City, Place


class CityDetailView(View):

    template_name = 'cities/city.html'
    query_pk_and_slug = True

    def get(self, request, *args, **kwargs):
        places = Place.objects.filter(city=self.kwargs.get('pk'))
        city = get_object_or_404(City, pk=self.kwargs.get('pk'))
        context = {
            'places': places,
            'city': city
        }
        return render(request, self.template_name, context)


class CityPlaceView(View):

    template_name = 'cities/places.html'
    query_pk_and_slug = True

    def get(self, request, *args, **kwargs):
        places = Place.objects.filter(city=self.kwargs.get('pk'))
        city = get_object_or_404(City, pk=self.kwargs.get('pk'))
        context = {
            'places': places,
            'city': city
        }
        return render(request, self.template_name, context)

class CityPackageView(View):

    template_name = 'cities/package.html'
    query_pk_and_slug = True

    def get(self, request, *args, **kwargs):
        city = get_object_or_404(City, pk=self.kwargs.get('pk'))
        context = {
            'city': city
        }
        return render(request, self.template_name, context)


class CityTravelView(View):

    template_name = 'cities/travel.html'
    query_pk_and_slug = True

    def get(self, request, *args, **kwargs):
        city = get_object_or_404(City, pk=self.kwargs.get('pk'))
        context = {
            'city': city
        }
        return render(request, self.template_name, context)


class CityHotelView(View):

    template_name = 'cities/hotel.html'
    query_pk_and_slug = True

    def get(self, request, *args, **kwargs):
        city = get_object_or_404(City, pk=self.kwargs.get('pk'))
        context = {
            'city': city
        }
        return render(request, self.template_name, context)


class CityActivityView(View):

    template_name = 'cities/activities.html'
    query_pk_and_slug = True

    def get(self, request, *args, **kwargs):
        city = get_object_or_404(City, pk=self.kwargs.get('pk'))
        context = {
            'city': city
        }
        return render(request, self.template_name, context)


class CityEventsView(View):

    template_name = 'cities/events.html'
    query_pk_and_slug = True

    def get(self, request, *args, **kwargs):
        city = get_object_or_404(City, pk=self.kwargs.get('pk'))
        context = {
            'city': city
        }
        return render(request, self.template_name, context)


class CityFoodView(View):

    template_name = 'cities/food.html'
    query_pk_and_slug = True

    def get(self, request, *args, **kwargs):
        city = get_object_or_404(City, pk=self.kwargs.get('pk'))
        context = {
            'city': city
        }
        return render(request, self.template_name, context)


class CityPhotoView(View):

    template_name = 'cities/photos.html'
    query_pk_and_slug = True

    def get(self, request, *args, **kwargs):
        city = get_object_or_404(City, pk=self.kwargs.get('pk'))
        context = {
            'city': city
        }
        return render(request, self.template_name, context)


class CityMapView(View):

    template_name = 'cities/map.html'
    query_pk_and_slug = True

    def get(self, request, *args, **kwargs):
        city = get_object_or_404(City, pk=self.kwargs.get('pk'))
        context = {
            'city': city
        }
        return render(request, self.template_name, context)
