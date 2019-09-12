from django.shortcuts import render
from django.views import View

from cities.models import City, Theme
# Create your views here.

# def home(request):
#     return render(request,'home/index.html')


class HomeView(View):

    template_name = 'home/index.html'

    def get(self, request, *args, **kwargs):
        top_destinations = City.objects.filter(is_top_destination=1)
        cities = City.objects.all()
        themes = Theme.objects.all()
        context = {
            'top_destinations': top_destinations,
            'cities': cities,
            'themes': themes
        }
        return render(request, self.template_name, context)
