from django.contrib import admin
from django.urls import path
from home import views

urlpatterns = [
     path("",views.login, name='Login'),

     path("dashboard/",views.dashboard, name='dashboard'),
     
     path("department/", views.department, name="department"),

     path("practice/", views.practice, name="practice"),
   
      path("roadmap/", views.roadmap, name="roadmap"),

]
