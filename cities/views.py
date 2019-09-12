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