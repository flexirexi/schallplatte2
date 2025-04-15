from django.shortcuts import render
from .services import CalendarCursor
from .models import Room
from django.utils import timezone
from django.utils.dateparse import parse_date



def calendar(request):
    selected_date = request.GET.get("selected_date")
    
    if selected_date:
        date = parse_date(selected_date)
    else:
        date = timezone.now().date()

    cursor = CalendarCursor(date, request.user)
    today = timezone.now().date()

    context = {
        "cursor": cursor,
        "rooms": Room.objects.all(),
        "hours": range(24),
        "selected_date": date,
        "today": today,
        "user": request.user,
    }

    return render(request, "rooms/calendar.html", context)

