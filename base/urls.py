from django.contrib import admin
from django.urls import path
from base import views

urlpatterns = [
    # Team URLs
    path("teams/", views.teams, name = 'teams'),
    path("team/<str:pk>/", views.team, name="team"),

    # Bug URLs
    path("buglist/<str:pk>/",views.bugslist, name = 'buglist'),
    path("bugs/", views.bugs, name = 'bugs'),
    path("bug/<str:pk>/", views.bug, name="bug"),

    # Comment URLs
    path("comments/<str:pk>", views.comments, name = 'comments'),

    path("auth/userprofile/<str:pk>", views.userprofile, name = 'userprofile'),
    #Tag URLs
    path("tag/", views.tag)
]
