from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import LoginUser

class UserAdmin(BaseUserAdmin):
    list_display = ('mobile_number', 'is_staff', 'is_active')
    search_fields = ('mobile_number',)
    ordering = ('mobile_number',)
    fieldsets = (
        (None, {'fields': ('mobile_number', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

# Unregister the default `LoginUser` registration if it exists
try:
    admin.site.unregister(LoginUser)
except admin.sites.NotRegistered:
    pass

admin.site.register(LoginUser, UserAdmin)
