from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, 
                                related_name="profile")
    firstname = models.CharField(max_length=150, blank=True)
    lastname = models.CharField(max_length=150, blank=True)
    instruments = models.CharField(max_length=150, blank=True)
    about = models.TextField(max_length=500, blank=True)

    def __str__(self):
        return self.user.username


class Notifications(models.Model):
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE,
                                related_name="notifications")
    message = models.TextField(max_length=1000)
    received = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user_id}: {self.message}"
