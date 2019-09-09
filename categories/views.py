from django.shortcuts import render, get_list_or_404, redirect
from django.urls import reverse_lazy
from django.views import View
from cities.models import City, Place , Theme, IdealMonth, Activities


class CategoryView(View):

    template_name = 'categories/categories.html'
    query_pk_and_slug = True

    def get(self, request, *args, **kwargs):
        if self.kwargs.get('pk') == 0:
            current_theme = []
            cities = City.objects.all()
        else:
            current_theme = get_list_or_404(Theme, pk=self.kwargs.get('pk'))
            cities = City.objects.filter(themes__in=current_theme)
        themes = Theme.objects.all()
        all_cities = City.objects.all()
        activities = Activities.objects.all()
        context = {
            'cities': cities,
            'themes': themes,
            'current_theme': current_theme,
            'all_cities': all_cities,
            'activities': activities,
        }
        return render(request, self.template_name, context)


class FilterView(View):

    template_name = 'categories/filtercity.html'

    def post(self, request, *args, **kwargs):
        themes = request.POST.getlist('themes[]')
        city = request.POST.getlist('city[]')
        month = request.POST.getlist('month[]')
        activity = request.POST.getlist('activity[]')
        region = request.POST.getlist('region[]')
        if (not themes) and (not city) and (not month) and (not activity) and (not region):
            cities = City.objects.all()
        else:

            if not themes:
                current_theme = Theme.objects.all()
            else:
                current_theme = Theme.objects.filter(pk__in=themes)

            if activity:
                if not city:
                    city = City.objects.all().values_list('pk', flat=True)
                else:
                    city = [int(i) for i in city]
                activity = Activities.objects.filter(pk__in=activity)
                city_based_on_activities = set(Place.objects.filter(activities__in=activity).values_list('city', flat=True))
                city = set(city)
                print(city_based_on_activities)
                print(city)
                city = list(city & city_based_on_activities)
                print(city)

            if not city and not activity:
                city = City.objects.all().values_list('pk', flat=True)

            if month:
                month_list = [0]
                for i in month:
                    li = i.split(',')
                    for j in li:
                        month_list.append(int(j))
                month = month_list
                month = IdealMonth.objects.filter(month_number__in=month)
            else:
                month = IdealMonth.objects.all()

            if not region:
                region = ['North India', 'South India', 'East India', 'West India', 'Central India', 'North-East', 'International']
            cities = City.objects.filter(themes__in=current_theme,
                                         pk__in=city,
                                         ideal_month__in=month,
                                         region__in=region,
                                         ).distinct()
        context = {
            'cities': cities,
        }

        return render(request, self.template_name, context)
