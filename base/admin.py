from django.contrib import admin
from base.models import Bug, Team, Tag
# Register your models here.

admin.site.register(Bug)
admin.site.register(Team)
admin.site.register(Tag)
admin.site.register(Comment)