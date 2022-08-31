from rest_framework import serializers
from .models import Room


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        exclude = ("modified",)
        read_only_fields = ("user", "id", "created", "updated")