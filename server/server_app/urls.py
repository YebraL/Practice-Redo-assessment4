from django.urls import path
from . import views

urlpatterns = [
   
    path('', views.send_the_homepage),
    path('categories/', views.categories),
    path('category/<int:category_id>/', views.category)
]