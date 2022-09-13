from rest_framework.routers import DefaultRouter
from . import views

app_name = "reports"
router = DefaultRouter()
router.register("", views.ReportViewSet)


urlpatterns = router.urls
