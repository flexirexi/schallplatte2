from django import forms
from .models import Room
from django.contrib.auth.models import User


class BookingForm(forms.Form):
    room = forms.ModelChoiceField(queryset=Room.objects.all())
    start = forms.DateTimeField()
    end = forms.DateTimeField()
    user = forms.ModelChoiceField(
        queryset=User.objects.all(), widget=forms.HiddenInput(), required=False
    )

    def clean(self):
        cleaned = super().clean()
        start = cleaned.get("start")
        end = cleaned.get("end")

        if start and end and end <= start:
            raise forms.ValidationError("Endzeit muss nach Startzeit liegen.")

        return cleaned
