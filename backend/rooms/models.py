from django.db import models
from core.models import CoreModel


class RoomTag(CoreModel):

    name = models.CharField(max_length=140)

    def __str__(self):
        return self.name


class Room(CoreModel):

    name = models.CharField(max_length=140)
    address = models.CharField(max_length=140)
    price = models.IntegerField(help_text="USD per night")
    beds = models.IntegerField(default=1)
    lat = models.DecimalField(max_digits=10, decimal_places=6)
    lng = models.DecimalField(max_digits=10, decimal_places=6)
    bedrooms = models.IntegerField(default=1)
    bathrooms = models.IntegerField(default=1)
    instant_book = models.BooleanField(default=False)
    room_tag = models.ManyToManyField("RoomTag", related_name="room_tag", null=True, )

    def __str__(self):
        return self.name
