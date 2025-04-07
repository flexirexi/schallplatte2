from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('rooms/', views.rooms, name="rooms"),
    path('forum/', views.forum, name="formum"),
    path('about/', views.about, name="about"),
]
