from rest_framework import serializers
from .models import Report, ReportContent


class RoomContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportContent
        exclude = ("id", "modified", "created")


class ReportSerializer(serializers.ModelSerializer):

    report_content = RoomContentSerializer(many=True,)

    class Meta:
        model = Report
        exclude = ("modified", "created")
        read_only_fields = ("id", "updated")

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
