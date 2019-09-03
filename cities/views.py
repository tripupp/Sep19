from django.shortcuts import render, get_object_or_404
from django.urls import reverse_lazy
from django.views.generic import (
    ListView,
    DetailView,
)
from .models import City, Place


class CityDetailView(DetailView):

    model = City
    template_name = 'cities/city.html'
    context_object_name = 'cities'
    query_pk_and_slug = True
