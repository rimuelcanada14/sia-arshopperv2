from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import LoginUser, AddProduct

class UserAdmin(BaseUserAdmin):
    list_display = ('mobile_number', 'is_staff', 'is_active')
    search_fields = ('mobile_number',)
    ordering = ('mobile_number',)
    fieldsets = (
        (None, {'fields': ('mobile_number', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
       
    )

# Unregister the default `LoginUser` registration if it exists
try:
    admin.site.unregister(LoginUser)
except admin.sites.NotRegistered:
    pass


admin.site.register(LoginUser, UserAdmin)

#this is for fetching data from the database to display products

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'ingredients', 'nutritional_facts')
    search_fields = ('name',)
    list_filter = ('price',)

admin.site.register(AddProduct, ProductAdmin)


    