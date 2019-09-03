from django.urls import path
from . import views as city_views

urlpatterns = [
    path('<int:pk>-<str:slug>/', city_views.CityDetailView.as_view(),
         name="cities-city_detail"),
]
