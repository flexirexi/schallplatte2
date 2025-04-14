from django.shortcuts import render, redirect
from .form import EditProfileForm
from .models import Profile


# Create your views here.
def login(request):
    return render(request, 'account/login.html')


def profile(request):
    user = request.user
    profile = Profile.objects.get(user=user)

    return render(request, 'user/profile.html', {
        'user': user,
        'profile': profile
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
