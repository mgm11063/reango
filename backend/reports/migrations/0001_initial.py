# Generated by Django 4.1 on 2022-09-16 07:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Rater",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=80, verbose_name="선택가능한 옵션")),
            ],
            options={
                "verbose_name_plural": "평가자",
            },
        ),
        migrations.CreateModel(
            name="Report",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created", models.DateTimeField(auto_now_add=True)),
                ("modified", models.DateTimeField(auto_now=True)),
                ("datetime", models.DateTimeField(auto_now=True)),
                ("title", models.CharField(max_length=50)),
                ("department", models.CharField(max_length=50)),
                ("place", models.CharField(max_length=50)),
                ("is_equipment", models.BooleanField(default=False)),
                ("is_amount", models.BooleanField(default=False)),
                ("is_speed", models.BooleanField(default=False)),
                ("is_change", models.BooleanField(default=False)),
                (
                    "rater",
                    models.ManyToManyField(
                        blank=True,
                        related_name="rater",
                        to="reports.rater",
                        verbose_name="평가자",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="ReportContent",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created", models.DateTimeField(auto_now_add=True)),
                ("modified", models.DateTimeField(auto_now=True)),
                ("work", models.CharField(max_length=50)),
                ("content", models.TextField(max_length=300)),
                ("overload", models.IntegerField(verbose_name="작업부화")),
                ("frequency", models.IntegerField(verbose_name="작업빈도")),
                (
                    "image",
                    models.ImageField(
                        blank=True, upload_to="report_photos", verbose_name="사진"
                    ),
                ),
                ("no1", models.BooleanField(default=False)),
                ("no2", models.BooleanField(default=False)),
                ("no3", models.BooleanField(default=False)),
                ("no4", models.BooleanField(default=False)),
                ("no5", models.BooleanField(default=False)),
                ("no6", models.BooleanField(default=False)),
                ("no7", models.BooleanField(default=False)),
                ("no8", models.BooleanField(default=False)),
                ("no9", models.BooleanField(default=False)),
                ("no10", models.BooleanField(default=False)),
                ("no11", models.BooleanField(default=False)),
                (
                    "report",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="report_content",
                        to="reports.report",
                        verbose_name="리포트",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
