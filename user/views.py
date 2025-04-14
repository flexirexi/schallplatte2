from django.shortcuts import render, redirect
from .form import EditProfileForm
from .models import Profile
from rooms.models import RoomCalendar


# Create your views here.
def login(request):
    return render(request, 'account/login.html')


def profile(request):
    user = request.user
    profile = Profile.objects.get(user=user)

    bookings = user.user_bookings.all().order_by('start_daytime')

    return render(request, 'user/profile.html', {
        'user': user,
        'profile': profile,
        'bookings': bookings,
    })


def profile_edit(request):
    user = request.user

    profile, created = Profile.objects.get_or_create(user=user)

    if request.method == 'POST':
        form = EditProfileForm(request.POST, request.FILES, instance=profile, user=user)
        if form.is_valid():
            form.save()
            return redirect('user:profile')
    else:
        form = EditProfileForm(instance=profile, user=user)

    return render(request, 'user/profile_edit.html', {'form': form})


def notifications(request):
    return render(request, 'user/notifications.html')
