from django.contrib import admin
from django.urls import path
from home import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
      path("", views.home, name='home'),  # redirects to AllAuth login
      path("dashboard/", views.dashboard, name='dashboard'),
      path("department/", views.department, name="department"),
      path("practice/", views.practice, name="practice"),
      path("roadmap/", views.roadmap, name="roadmap"),
      path("tutorial/", views.tutorial, name="tutorial"),
      path("upload_page/", views.upload_page, name="upload_page"),
]

if settings.DEBUG:
      urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)