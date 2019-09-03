from django.shortcuts import render
from django.views import View

from cities.models import City
# Create your views here.

# def home(request):
#     return render(request,'home/index.html')


class HomeView(View):

    template_name = 'home/index.html'

    def get(self, request, *args, **kwargs):
        cities = City.objects.all()
        context = {
            'cities': cities
        }
        return render(request, self.template_name, context)
