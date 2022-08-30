from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView


class HomeTemplateView(TemplateView):
    template_name = 'index.html'


urlpatterns = [
    path("admin/", admin.site.urls),
    path('', HomeTemplateView.as_view(), name='home'),
    path("api/v1/rooms/", include("rooms.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
