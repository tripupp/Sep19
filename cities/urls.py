from django.urls import path
from . import views as city_views

urlpatterns = [
     path('<int:pk>-<str:slug>/', city_views.CityDetailView.as_view(),
          name="cities-city_detail"),

     path('<int:pk>-<str:slug>/places/', city_views.CityPlaceView.as_view(),
          name="cities-city_place"),

     path('<int:pk>-<str:slug>/packages/',
          city_views.CityPackageView.as_view(),
          name="cities-city_packages"),
     path('package-filter',
          city_views.CityPackageFilterView.as_view(),
          name="cities-city_packages_filter"),

     path('<int:pk>-<str:slug>/travel/', city_views.CityTravelView.as_view(),
          name="cities-city_tarvel"),

     path('<int:pk>-<str:slug>/hotels/', city_views.CityHotelView.as_view(),
          name="cities-city_hotels"),

     path('', city_views.CityHotelFilterView.as_view(),
          name="cities-city_hotels_filter"),

     path('<int:pk>-<str:slug>/Activities/',
          city_views.CityActivityView.as_view(),
          name="cities-city_activities"),

     path('<int:pk>-<str:slug>/Events/', city_views.CityEventsView.as_view(),
          name="cities-city_events"),

     path('<int:pk>-<str:slug>/foods/', city_views.CityFoodView.as_view(),
          name="cities-city_foods"),
     path('', city_views.CityFoodFilterView.as_view(),
          name="cities-city_foods_filter"),

     path('<int:pk>-<str:slug>/photos/', city_views.CityPhotoView.as_view(),
          name="cities-city_photo"),

     path('<int:pk>-<str:slug>/map/', city_views.CityMapView.as_view(),
          name="cities-city_map"),
]
