from django.shortcuts import render
from django.views import View

from cities.models import City, Theme
# Create your views here.

# def home(request):
#     return render(request,'home/index.html')


class HomeView(View):

    template_name = 'home/index.html'

    def get(self, request, *args, **kwargs):
        cities = City.objects.all()
        themes = Theme.objects.all()
        context = {
            'cities': cities,
            'themes': themes
        }
        return render(request, self.template_name, context)
