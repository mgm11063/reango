from django.db import models
from core.models import CoreModel


class AbstractItem(models.Model):

    """Abstract Item"""

    name = models.CharField("선택가능한 옵션", max_length=80)

    class Meta:
        abstract = True

    def __str__(self):
        return self.name


class Rater(AbstractItem):

    """Rater Model Definition"""

    class Meta:
        verbose_name_plural = "평가자"

#  =================================================================


class Report(CoreModel):
    datetime = models.DateTimeField(auto_now=True)
    rater = models.ManyToManyField(
        "Rater",
        related_name="rater",
        blank=True,
        verbose_name="평가자",
    )
    title = models.CharField(max_length=50)
    department = models.CharField(max_length=50)
    place = models.CharField(max_length=50)
    is_equipment = models.BooleanField(default=False)
    is_amount = models.BooleanField(default=False)
    is_speed = models.BooleanField(default=False)
    is_change = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class ReportContent(CoreModel):
    report = models.ForeignKey(
        "Report",
        related_name="report_content",
        on_delete=models.CASCADE,
        verbose_name="리포트",
    )
    work = models.CharField(max_length=50)
    content = models.TextField(max_length=300)
    overload = models.IntegerField("작업부화")
    frequency = models.IntegerField("작업빈도")
    no1 = models.BooleanField(default=False)
    no2 = models.BooleanField(default=False)
    no3 = models.BooleanField(default=False)
    no4 = models.BooleanField(default=False)
    no5 = models.BooleanField(default=False)
    no6 = models.BooleanField(default=False)
    no7 = models.BooleanField(default=False)
    no8 = models.BooleanField(default=False)
    no9 = models.BooleanField(default=False)
    no10 = models.BooleanField(default=False)
    no11 = models.BooleanField(default=False)