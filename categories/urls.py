from django.urls import path
from . import views as categories_views

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('<int:pk>-<str:slug>/', categories_views.CategoryView.as_view(),
         name='categories-category'),
    path('', categories_views.FilterView.as_view(),
         name='categories-filter')
]
