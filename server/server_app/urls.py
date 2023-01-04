from django.urls import path
from . import views

urlpatterns = [
   
    path('', views.send_the_homepage),
    path('categories/', views.categories),
    path('category/<int:category_id>/', views.category),
    path('allPosts/', views.posts),
    path('category/<int:category_id>/posts', views.post_by_category_id ),
    path('posts/<int:id_category>/', views.post_by_category_id),
    path('postss/<int:post_id>/', views.post_edit),
]