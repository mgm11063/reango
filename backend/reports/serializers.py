from rest_framework import serializers
from .models import Rater, Report, ReportContent


class RoomContentSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, allow_empty_file=True, allow_null=True, required=False)
    
    class Meta:
        model = ReportContent
        exclude = ("id", "modified", "created", "report")


class ReportSerializer(serializers.ModelSerializer):

    report_content = RoomContentSerializer(many=True,)

    class Meta:
        model = Report
        exclude = ("modified", "created")
        read_only_fields = ("id", "updated")

    def validate(self, data):
        return data

    def create(self, validated_data):
        report_content = validated_data.pop('report_content')
        rater = validated_data.pop('rater')
        report = Report.objects.create(**validated_data)

        for name in rater:
            arg = Rater.objects.get(name=name)
            Report.objects.get(pk=report.pk).rater.add(arg.pk)

        for content in report_content:
            Report.objects.get(pk=report.pk).report_content.create(**content)
            # ReportContent.objects.create(**content)

        return report
