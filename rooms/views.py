from django.shortcuts import render


# Create your views here.
def calendar(request):
    return render(request, "rooms/calendar.html", {
        "hours": range(24),
        "rooms": range(1, 9),  # do not mix up with 1 to 9-> this is 8
    })
