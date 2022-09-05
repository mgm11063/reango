from django.contrib import admin
from . import models


@admin.register(models.Room)
class RoomAdmin(admin.ModelAdmin):

    list_display = (
        "name",
    )


@admin.register(models.RoomTag)
class RoomTagAdmin(admin.ModelAdmin):
    pass
