from django.shortcuts import render


# Create your views here.
def login(request):
    return render(request, 'account/login.html')


def profile(request):
    return render(request, 'user/profile.html')


def profile_edit(request):
    return render(request, 'user/profile_edit.html')
