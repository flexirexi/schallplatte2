from django.shortcuts import render
from .services import CalendarCursor
from .models import Room
from django.utils import timezone
from datetime import datetime
from django.http import JsonResponse
from .models import RoomCalendar
from django.utils.dateparse import parse_date

# # Create your views here.
# def calendar(request):
#     return render(request, "rooms/calendar.html", {
#         "hours": range(24),
#         "rooms": range(1, 9),  # info for me: do not mix up with 1 to 9-> this is 8
#     })


def calendar(request):
    # selected_date = datetime.today().strftime('%Y-%m-%d')
    # if selected_date:
    #     date = datetime.strptime(selected_date, "%Y-%m-%d").date()
    # else:
    date = timezone.now().date()

    cursor = CalendarCursor(date, request.user)

    return render(request, "rooms/calendar.html", {
        "cursor": cursor,
        "rooms": range(1, 9),
        "hours": range(24),
        "selected_date": date,
    })


def calendar_data(request):
    selected_date = request.GET.get("selected_date")
    date = parse_date(selected_date)

    if not date:
        return JsonResponse({"error": "Invalid date"}, status=400)

    bookings = RoomCalendar.objects.filter(start_daytime__date=date)

    data = [{
        "room": b.room.id,
        "user": b.user.username,
        "start": b.start_daytime.strftime("%H:%M"),
        "end": b.end_daytime.strftime("%H:%M")
    } for b in bookings]

    return JsonResponse({"bookings": data})
