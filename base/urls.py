from django.contrib import admin
from django.urls import path
from base import views

urlpatterns = [
    path("team/<str:pk>/", views.team, name="task"),
]
