from django.contrib import admin
from .models import Room, RoomCalendar

# Register your models here.
admin.site.register(Room)
admin.site.register(RoomCalendar)
