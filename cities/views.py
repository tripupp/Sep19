from django.shortcuts import render, get_object_or_404
from django.urls import reverse_lazy
from django.views import View
from .models import (
            City, Place, Theme,
            Food, FoodCuisine, FoodDietaryTypes, FoodFeatures, FoodMeal,
            Package, Hotel, HotelFacility, photos,
            )


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
        packages = Package.objects.filter(city=city)
        themes = Theme.objects.all()
        context = {
            'city': city,
            'packages': packages,
            'themes': themes,
        }
        return render(request, self.template_name, context)


class CityPackageFilterView(View):

    template_name = 'cities/package_filter.html'

    def post(self, request, *args, **kwargs):

        def create_list_of_tuples(string_list):
            string_list = [i.split(',') for i in string_list]
            integer_lst = []
            for pr in string_list:
                integer_lst.append(int(pr[0]))
                integer_lst.append(int(pr[1]))
            return integer_lst

        city_id = request.POST.get('city_id')
        rating = request.POST.getlist('rating[]')
        price = request.POST.getlist('price[]')
        theme = request.POST.getlist('theme[]')
        duration = request.POST.getlist('duration[]')

        city = get_object_or_404(City, pk=city_id)

        price_lst = create_list_of_tuples(price)
        duration_lst = create_list_of_tuples(duration)

        if (not rating) and (not price) and (not theme) and (not duration):
            packages = Package.objects.filter(city=city)
        else:

            if not rating:
                rating = [2, 3, 4, 5]
            else:
                rating = [int(i) for i in rating]

            if not theme:
                theme = Theme.objects.all()
            else:
                theme = Theme.objects.filter(pk__in=theme)

            if not price_lst:
                min_price = 0
                max_price = 100000000000
            else:
                min_price = min(price_lst)
                max_price = max(price_lst)

            if not duration_lst:
                min_duration = 0
                max_duration = 365
            else:
                min_duration = min(duration_lst)
                max_duration = max(duration_lst)

            packages = Package.objects.filter(
                duration__range=(min_duration, max_duration),
                price__range=(min_price, max_price),
                theme__in=theme,
                star_ratings__in=rating,
                ).distinct()
        context = {
            'packages': packages,
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
        hotels = Hotel.objects.filter(city=city)
        facilities = HotelFacility.objects.all()
        context = {
            'city': city,
            'hotels': hotels,
            'facilities': facilities
        }
        return render(request, self.template_name, context)


class CityHotelFilterView(View):
    template_name = 'cities/hotel_filter.html'

    def post(self, request, *args, **kwargs):

        def create_list_of_tuples(string_list):
            string_list = [i.split(',') for i in string_list]
            integer_lst = []
            for pr in string_list:
                integer_lst.append(int(pr[0]))
                integer_lst.append(int(pr[1]))
            return integer_lst

        city_id = request.POST.get('city_id')
        rating = request.POST.getlist('rating[]')
        price = request.POST.getlist('price[]')
        type = request.POST.getlist('theme[]')
        facility = request.POST.getlist('duration[]')

        city = get_object_or_404(City, pk=city_id)

        price_lst = create_list_of_tuples(price)

        if (not rating) and (not price) and (not type) and (not facility):
            hotels = Hotel.objects.filter(city=city)
        else:

            if not rating:
                rating = [1, 2, 3, 4, 5]
            else:
                rating = [int(i) for i in rating]

            if not price_lst:
                min_price = 0
                max_price = 100000000000
            else:
                min_price = min(price_lst)
                max_price = max(price_lst)

            if not facility:
                facility = HotelFacility.objects.all()
            else:
                facility = HotelFacility.objects.filter(pk__in=facility)


            hotels = Hotel.objects.filter(
                hotel_type__in=type,
                price__range=(min_price, max_price),
                facilities=facility,
                star_ratings__in=rating,
                ).distinct()
        context = {
            'hotels': hotels,
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
        foods = Food.objects.filter(city=city)
        meals = FoodMeal.objects.all()
        dietary_types = FoodDietaryTypes.objects.all()
        cuisines = FoodCuisine.objects.all()
        features = FoodFeatures.objects.all()
        context = {
            'city': city,
            'foods': foods,
            'meals': meals,
            'dietary_types': dietary_types,
            'cuisines': cuisines,
            'features': features,
        }
        return render(request, self.template_name, context)


class CityFoodFilterView(View):

    template_name = 'cities/food_filter.html'

    def post(self, request, *args, **kwargs):
        # foods = Food.objects.filter(city=city)
        # meals = FoodMeal.objects.all()
        # dietary_types = FoodDietaryTypes.objects.all()
        # cuisines = FoodCuisine.objects.all()
        # features = FoodFeatures.objects.all()
        city_id = request.POST.get('city_id')
        meals = request.POST.getlist('meals[]')
        price = request.POST.getlist('price[]')
        feature = request.POST.getlist('feature[]')
        cuisine = request.POST.getlist('cuisine[]')
        dietary = request.POST.getlist('dietary[]')
        city = get_object_or_404(City, pk=city_id)
        price = [i.split(',') for i in price]
        price_lst = []
        for pr in price:
            price_lst.append(int(pr[0]))
            price_lst.append(int(pr[1]))
        

        if (not meals) and (not price) and (not feature) and (not cuisine) and (not dietary):
            foods = Food.objects.filter(city=city)
        else:

            if not meals:
                meals = FoodMeal.objects.all()
            else:
                meals = FoodMeal.objects.filter(pk__in=meals)

            if not feature:
                feature = FoodFeatures.objects.all()
            else:
                feature = FoodFeatures.objects.filter(pk__in=feature)

            if not cuisine:
                cuisine = FoodCuisine.objects.all()
            else:
                cuisine = FoodCuisine.objects.filter(pk__in=cuisine)

            if not dietary:
                dietary = FoodDietaryTypes.objects.all()
            else:
                dietary = FoodDietaryTypes.objects.filter(pk__in=dietary)

            if not price_lst:
                min_price = 0
                max_price = 100000000000
            else:
                min_price = min(price_lst)
                max_price = max(price_lst)
            print(min_price,max_price)
            foods = Food.objects.filter(meal__in=meals,
                                        dietary_types__in=dietary,
                                        cuisine__in=cuisine,
                                        features__in=feature,
                                        minimum_price__gte=min_price,
                                        maximum_price__lte=max_price,
                                        ).distinct()


        context = {
            'foods': foods,
        }
        return render(request, self.template_name, context)


class CityPhotoView(View):

    template_name = 'cities/photos.html'
    query_pk_and_slug = True

    def get(self, request, *args, **kwargs):
        city = get_object_or_404(City, pk=self.kwargs.get('pk'))
        photo = photos.objects.filter(city=city)
        themes = Theme.objects.all()
        context = {
            'city': city,
            'photos': photo,
            'themes': themes,
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
