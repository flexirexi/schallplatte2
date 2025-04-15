from django.shortcuts import get_object_or_404
from .models import RoomCalendar
from datetime import datetime


def delete_booking(id, user):
    booking = get_object_or_404(RoomCalendar, id=id, user=user)
    booking.delete()
    return True


class CalendarCursor:
    def __init__(self, date: datetime.date, user):
        self.date = date
        self.user = user

        self.all_bookings = RoomCalendar.objects.filter(
            start_daytime__date=self.date).select_related("room", "user")
        self.user_bookings = [b for b in self.all_bookings if b.user == self.user]
        self.non_user_bookings = [b for b in self.all_bookings if b.user != self.user]
