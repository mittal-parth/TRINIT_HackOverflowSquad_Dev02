from django.contrib import admin
from base.models import *
# Register your models here.

from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


class InfoInLine(admin.StackedInline):
    model = Info
    can_delete = False

class UserAdmin(BaseUserAdmin):
    inlines = (InfoInLine,)

#Extending the existing User Model
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Bug)
admin.site.register(Team)
admin.site.register(Tag)
admin.site.register(Comment)