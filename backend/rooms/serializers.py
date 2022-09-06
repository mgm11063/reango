from rest_framework import serializers
from .models import Room, RoomTag


class RoomTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomTag
        fields = ("name",)


class RoomSerializer(serializers.ModelSerializer):

    is_fav = serializers.SerializerMethodField()
    room_tag = RoomTagSerializer(many=True,)

    class Meta:
        model = Room
        exclude = ("modified",)
        read_only_fields = ("id", "created", "updated")

    def validate(self, data):
        # if self.instance:
        #     check_in = data.get("check_in", self.instance.check_in)
        #     check_out = data.get("check_out", self.instance.check_out)
        # else:
        #     check_in = data.get("check_in")
        #     check_out = data.get("check_out")
        # if check_in == check_out:
        #     raise serializers.ValidationError("Not enough time between changes")
        return data

    def get_is_fav(self, obj):
        request = self.context.get("request")
        if request:
            user = request.user
            if user.is_authenticated:
                return obj in user.favs.all()
        return False

    def create(self, validated_data):

        room_tag_data = validated_data.pop('room_tag')
        room = Room.objects.create(**validated_data)
        for tag in room_tag_data:
            arg = RoomTag.objects.create(**tag)
            Room.objects.get(pk=room.pk).room_tag.add(arg)
        return room

    # 46번 진행중!  지금 작성한 룸 있잖아 room.pk로 저거 가지고오고 동시에 메니투 메니 셀렉트 해서 부리기
