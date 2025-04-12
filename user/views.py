from django.shortcuts import render


# Create your views here.
def login(request):
    return render(request, 'account/login.html')  # from here it goes to allAuth's account app


def profile(request):
    return render(request, 'user/profile.html')
