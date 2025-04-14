from django.urls import path
from . import views

app_name = "user"

urlpatterns = [
    path('profile/', views.profile, name="profile"),
    path('profile/edit/', views.profile_edit, name="profile_edit"),
    path('profile/notifications/', views.notifications, name='notifications'),
]
