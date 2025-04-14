from django.urls import path
from . import views

app_name = "user"

urlpatterns = [
    path('profile/', views.profile, name="profile"),
    path('profile/edit/', views.profile_edit, name="profile_edit"),
    path('profile/notifications/', views.notifications, name='notifications'),
    path('profile/booking/cancel/<int:id>/', views.booking_delete_view, name="delete_booking"),
]
