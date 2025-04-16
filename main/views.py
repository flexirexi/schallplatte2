from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, "main/index.html")


def rooms(request):
    return render(request, "main/rooms.html")


def forum(request):
    return render(request, "main/forum.html")


def about(request):
    return render(request, "main/about.html")
