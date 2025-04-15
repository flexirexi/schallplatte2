from django.shortcuts import get_object_or_404
from .models import RoomCalendar


def delete_booking(id, user):
    booking = get_object_or_404(RoomCalendar, id=id, user=user)
    booking.delete()
    return True
