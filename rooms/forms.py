from django import forms
from .models import Room


class BookingForm(forms.Form):
    room = forms.ModelChoiceField(queryset=Room.objects.all())
    start = forms.DateTimeField()
    end = forms.DateTimeField()
    user = forms.IntegerField(widget=forms.HiddenInput())

    def clean(self):
        cleaned = super().clean()
        if cleaned["end"] <= cleaned["start"]:
            raise forms.ValidationError("End time must be after start time.")
        return cleaned