# Generated by Django 4.1 on 2022-08-30 07:13

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Photo",
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
                ("file", models.ImageField(upload_to="")),
                ("caption", models.CharField(max_length=140)),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Room",
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
                ("name", models.CharField(max_length=140)),
                ("address", models.CharField(max_length=140)),
                ("price", models.IntegerField(help_text="USD per night")),
                ("beds", models.IntegerField(default=1)),
                ("lat", models.DecimalField(decimal_places=6, max_digits=10)),
                ("lng", models.DecimalField(decimal_places=6, max_digits=10)),
                ("bedrooms", models.IntegerField(default=1)),
                ("bathrooms", models.IntegerField(default=1)),
                ("check_in", models.TimeField(default="00:00:00")),
                ("check_out", models.TimeField(default="00:00:00")),
                ("instant_book", models.BooleanField(default=False)),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
