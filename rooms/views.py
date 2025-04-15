from django.shortcuts import render, redirect
from .services import CalendarCursor
from .models import Room
from django.utils import timezone
from django.utils.dateparse import parse_date
from .forms import BookingForm
from django.views.decorators.http import require_POST
from django.contrib import messages


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
        "form": BookingForm(),
    }

    return render(request, "rooms/calendar.html", context)


@require_POST
def booking(request):
    if request.method == "POST":
        form = BookingForm(request.POST)
        if form.is_valid():
            date = form.cleaned_data["start"].date()
            cursor = CalendarCursor(date, request.user)
            cursor.save_booking(
                user=request.user,
                room=form.cleaned_data["room"],
                start=form.cleaned_data["start"],
                end=form.cleaned_data["end"]
            )
            messages.success(request, "Booking successful.")
            return redirect("rooms:calendar")