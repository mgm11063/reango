from django.contrib import admin
from . import models


@admin.register(
    models.Rater,
)
class ItemAdmin(admin.ModelAdmin):

    """Item Admin Definition"""

    list_display = ("name",)
    search_fields = ("name",)

    def __str__(self):
        return self.name


class ReportContentInline(admin.TabularInline):

    model = models.ReportContent
    extra = 0


@admin.register(models.Report)
class ReportAdmin(admin.ModelAdmin):
    inlines = (ReportContentInline,)
    list_display = (
        "title",
    )
