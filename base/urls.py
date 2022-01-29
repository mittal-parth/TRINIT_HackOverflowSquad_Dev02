from django.contrib import admin
from django.urls import path
from base import views

urlpatterns = [
    # Team URLs
    path("teams/", views.teams, name = 'teams'),
    path("team/<str:pk>/", views.team, name="team"),

    # Bug URLs
    path("bugs/", views.bugs, name = 'bugs'),
    path("bug/<str:pk>/", views.bug, name="bug"),

    #Tag URLs
    path("tag/", views.tag)
]
