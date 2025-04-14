from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,
                                related_name="profile", blank=True)
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


class Room(models.Model):
    name = models.CharField(max_length=150)
    size_cat = models.CharField(max_length=150)
    drum_kit = models.CharField(max_length=150)
    guitar_amps = models.CharField(max_length=150)
    bass_amps = models.CharField(max_length=150)
    piano = models.CharField(max_length=150)
    synth = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.id}: {self.name}"


class RoomCalendar(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, 
                                related_name="room_bookings")
    user = models.ForeignKey(User, on_delete=models.CASCADE, 
                                   related_name="user_bookings", blank=True)
    start_daytime = models.DateTimeField()
    end_daytime = models.DateTimeField()

    def __str__(self):
        return f"{self.room.name},{self.user}: {self.start_daytime} - {self.end_daytime}"
