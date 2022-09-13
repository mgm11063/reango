from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    avatar = models.ImageField(upload_to="avatars", blank=True)
    superhost = models.BooleanField(default=False)
    favs = models.ManyToManyField("reports.Report", related_name="favs")

    def room_count(self):
        return self.reports.count()

    room_count.short_description = "Room Count"
